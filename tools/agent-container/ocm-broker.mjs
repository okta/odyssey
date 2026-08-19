#!/usr/bin/env node
/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
// Host-side token broker for the persistent Odyssey workspace container.
//
// The headless workspace container has no browser, so any `ocm auth` that needs
// an interactive login (a broader Atlassian scope such as `write:jira-work`, an
// expired LiteLLM gateway key mid-session, a fresh GitHub token) cannot complete
// inside it. This daemon runs on the host, where `ocm` can open the host
// browser, and answers token requests the container drops into a bind-mounted
// file-spool.
//
// Transport is a file-spool, not a socket, on purpose: a Unix socket created
// here (a macOS-host kernel object) cannot be connect()-ed from the Linux
// container under Docker Desktop, and TCP over host.docker.internal would need
// the broker bound to a VM-reachable interface (wider network exposure). The
// `.workspace-env/` bind mount already carries files across the boundary
// (tokens.env, gpg keys), so the container writes `requests/<id>.json` and reads
// `responses/<id>.json`.
//
// Security: the container can only *request* a scoped token for an allowlisted
// service via a fixed set of `ocm auth` flags. It never runs an arbitrary host
// command and never sees the host filesystem. Tokens flow out; nothing else
// flows in.
//
// Node rather than Python so the workspace tooling stays on one runtime (the
// repo already ships Node); no third-party dependencies, only node: builtins.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

// Only these services may be requested. `ocm auth <service>` for anything else
// is refused, so a compromised container cannot mint tokens the workspace never
// needs (datadog, circleci, ...). `aurm` is on the list because the ord-skills
// Bacon scripts send an aurm token to Aperture to read CI status and test logs,
// which the in-container agents need to triage their own PRs.
const ALLOWED_SERVICES = new Set([
  "litellm",
  "atlassian",
  "aurm",
  "github",
  "artifactory",
]);

// Flags the container is allowed to pass through to `ocm auth`. Matches what
// launch-workspace.sh / launch-implementer.sh, the ord-skills, and the MCP
// header helpers use:
//   litellm   --site <host> --key-type all
//   atlassian --product jira --scopes read:jira-work,write:jira-work,...
//   aurm          (no extra flags)
//   github    --scope=<org>   (the github MCP header helper; org-scoped token)
//   artifactory   (no extra flags)
// plus ocm globals --force / --format / --env. Unknown flags are rejected.
const ALLOWED_FLAGS = new Set([
  "--site",
  "--product",
  "--scope",
  "--scopes",
  "--key-type",
  "--force",
  "--format",
  "--env",
]);

// Request ids become filenames, so they must not enable path traversal.
const ID_PATTERN = /^[A-Za-z0-9._-]+$/;
// Conservative value allowlist; `ocm` runs via a fixed argv (no shell), so this
// is defense-in-depth against a malformed request, not the only guard.
const VALUE_PATTERN = /^[A-Za-z0-9 ,:._/@=+-]+$/;

const OCM_TIMEOUT_SECONDS = 180;

const log = (message) => console.log(`[ocm-broker] ${message}`);

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const parseArguments = (argv) =>
  argv.reduce(
    (parsed, token, index, tokens) => {
      if (token === "--spool") {
        return { ...parsed, spool: tokens[index + 1] };
      }
      if (token === "--poll-interval") {
        return { ...parsed, pollIntervalSeconds: Number(tokens[index + 1]) };
      }
      return parsed;
    },
    { pollIntervalSeconds: 0.25 },
  );

// Return null if every arg is an allowed flag or a safe value, else the reason.
const validateArguments = (args) =>
  args.reduce((firstError, arg) => {
    if (firstError !== null) {
      return firstError;
    }
    if (typeof arg !== "string") {
      return `non-string arg: ${JSON.stringify(arg)}`;
    }
    if (arg.startsWith("--")) {
      const flag = arg.split("=", 1)[0];
      return ALLOWED_FLAGS.has(flag) ? null : `flag not allowed: ${flag}`;
    }
    return VALUE_PATTERN.test(arg)
      ? null
      : `value has disallowed characters: ${JSON.stringify(arg)}`;
  }, null);

// Run the real `ocm auth <service> ...` on the host and return its token. Throws
// an Error with a human-readable reason on any failure so the caller can relay
// it back to the container instead of crashing the loop.
const mintToken = (service, args) => {
  const completed = spawnSync("ocm", ["auth", service, ...args], {
    encoding: "utf8",
    timeout: OCM_TIMEOUT_SECONDS * 1000,
  });
  if (completed.error) {
    if (completed.error.code === "ETIMEDOUT") {
      throw new Error(`ocm auth timed out after ${OCM_TIMEOUT_SECONDS}s`);
    }
    throw new Error(completed.error.message);
  }
  if (completed.status !== 0) {
    throw new Error(
      completed.stderr.trim() || `ocm exited ${completed.status}`,
    );
  }
  const token = completed.stdout.trim();
  if (!token) {
    throw new Error("ocm returned an empty token");
  }
  return token;
};

const writeResponseAtomically = (responsesDir, requestId, payload) => {
  const finalPath = path.join(responsesDir, `${requestId}.json`);
  const temporaryPath = path.join(responsesDir, `.${requestId}.tmp`);
  fs.writeFileSync(temporaryPath, JSON.stringify(payload));
  fs.renameSync(temporaryPath, finalPath);
};

const handleRequest = (requestPath, responsesDir) => {
  let requestId = null;
  try {
    const request = JSON.parse(fs.readFileSync(requestPath, "utf8"));
    // Consume the request before running ocm so a crash mid-login never
    // reprocesses the same request on the next poll.
    fs.rmSync(requestPath);

    requestId = request.id;
    if (typeof requestId !== "string" || !ID_PATTERN.test(requestId)) {
      log(`rejecting request with invalid id: ${JSON.stringify(requestId)}`);
      return;
    }

    const service = request.service;
    const args = request.args ?? [];
    if (!ALLOWED_SERVICES.has(service)) {
      writeResponseAtomically(responsesDir, requestId, {
        error: `service not allowed: ${service}`,
      });
      log(`rejected disallowed service: ${JSON.stringify(service)}`);
      return;
    }
    if (!Array.isArray(args)) {
      writeResponseAtomically(responsesDir, requestId, {
        error: "args must be a list",
      });
      return;
    }
    const argumentError = validateArguments(args);
    if (argumentError !== null) {
      writeResponseAtomically(responsesDir, requestId, {
        error: argumentError,
      });
      log(`rejected ${service} request: ${argumentError}`);
      return;
    }

    const scopesIndex = args.indexOf("--scopes");
    const scopeNote = scopesIndex === -1 ? "" : ` [${args[scopesIndex + 1]}]`;
    const isForcing = args.includes("--force");
    log(
      `container requested ${service}${scopeNote}` +
        (isForcing ? " — completing login in your browser" : ""),
    );
    const token = mintToken(service, args);
    writeResponseAtomically(responsesDir, requestId, { token });
    log(`returned ${service} token`);
  } catch (error) {
    // Keep the daemon alive across a bad request.
    log(`error handling request: ${error.message}`);
    if (requestId) {
      writeResponseAtomically(responsesDir, requestId, {
        error: error.message,
      });
    }
  }
};

const main = async () => {
  const { spool, pollIntervalSeconds } = parseArguments(process.argv.slice(2));
  if (!spool) {
    console.error(
      "usage: ocm-broker.mjs --spool <dir> [--poll-interval <seconds>]",
    );
    process.exit(2);
  }

  const requestsDir = path.join(spool, "requests");
  const responsesDir = path.join(spool, "responses");
  fs.mkdirSync(requestsDir, { mode: 0o700, recursive: true });
  fs.mkdirSync(responsesDir, { mode: 0o700, recursive: true });

  log(
    `watching ${requestsDir} (services: ${[...ALLOWED_SERVICES].sort().join(", ")})`,
  );
  const pollIntervalMs = pollIntervalSeconds * 1000;
  while (true) {
    const pending = fs
      .readdirSync(requestsDir)
      .filter((entry) => entry.endsWith(".json") && !entry.startsWith("."))
      .sort();
    pending.forEach((entry) =>
      handleRequest(path.join(requestsDir, entry), responsesDir),
    );
    await sleep(pollIntervalMs);
  }
};

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

main();
