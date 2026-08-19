#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_NAME="odyssey-implementer-agent"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.yml"
# Must match docker-compose.yml's top-level `name:`. Used to spot a container
# left behind by a different compose project (e.g. after a directory rename).
COMPOSE_PROJECT="agent-container"
WORKSPACE_ENV_DIR="${SCRIPT_DIR}/.workspace-env"
BROKER_DIR="${WORKSPACE_ENV_DIR}/broker"
BROKER_PID_FILE="${WORKSPACE_ENV_DIR}/broker.pid"
BROKER_LOG="${WORKSPACE_ENV_DIR}/broker.log"

# The host token-broker (ocm-broker.mjs) runs the real `ocm auth …` on the
# host — where a browser exists — for token requests the headless container
# drops into BROKER_DIR's file-spool. Started as a background daemon so it
# outlives this script; stopped by `--stop`. See agent-container.md.
start_broker() {
  mkdir -m 700 -p "${BROKER_DIR}/requests" "${BROKER_DIR}/responses"
  if [ -f "${BROKER_PID_FILE}" ] && kill -0 "$(cat "${BROKER_PID_FILE}")" 2>/dev/null; then
    return 0
  fi
  nohup node "${SCRIPT_DIR}/ocm-broker.mjs" --spool "${BROKER_DIR}" >>"${BROKER_LOG}" 2>&1 &
  echo "$!" >"${BROKER_PID_FILE}"
  echo "started ocm token-broker (pid $(cat "${BROKER_PID_FILE}"), log ${BROKER_LOG})"
}

stop_broker() {
  if [ -f "${BROKER_PID_FILE}" ]; then
    kill "$(cat "${BROKER_PID_FILE}")" 2>/dev/null || true
    rm -f "${BROKER_PID_FILE}"
  fi
}

REFRESH_AUTH_ONLY=0
STOP_ONLY=0
# Headless bring-up: skip the interactive GPG passphrase prompt (and the key
# export) so the workspace can be launched non-interactively — commit signing
# is simply disabled until a normal (signing) launch is run. Everything else
# (tokens, broker, t3code) still works.
NO_SIGN=0

while [ $# -gt 0 ]; do
  case "$1" in
  --refresh-auth)
    REFRESH_AUTH_ONLY=1
    shift
    ;;
  --stop)
    STOP_ONLY=1
    shift
    ;;
  --no-sign)
    NO_SIGN=1
    shift
    ;;
  *)
    echo "error: unknown argument: $1" >&2
    exit 1
    ;;
  esac
done

if [ "${STOP_ONLY}" -eq 1 ]; then
  stop_broker
  docker compose -f "${COMPOSE_FILE}" down 2>/dev/null || true
  echo "stopped odyssey-workspace and ocm token-broker"
  exit 0
fi

# Token derivation intentionally mirrors launch-implementer.sh's logic
# (same ocm/gh flags) rather than a second, drifting implementation. Kept
# duplicated rather than extracted into a shared lib — launch-implementer.sh
# is mid-review (PR #569) and out of scope to touch here.
ANTHROPIC_BASE_URL="${ANTHROPIC_BASE_URL:-https://llm.es.atko.services}"
GATEWAY_SITE="${ANTHROPIC_BASE_URL#https://}"

NPM_TOKEN="$(ocm auth artifactory)"

# `ocm auth github` requires one of its [scope uri] flags — bare invocation exits
# 1 with "at least one of the flags in the group [scope uri] is required", which
# silently fell through to `gh auth token` and then failed outright on a machine
# where `gh` is not on PATH. Scope to the org, matching what the image's
# fetch-github-mcp-headers.sh requests.
GITHUB_TOKEN_SCOPE="${GITHUB_TOKEN_SCOPE:-atko-eng}"
GH_TOKEN=""
if GH_TOKEN_TRY="$(ocm auth github --scope="${GITHUB_TOKEN_SCOPE}" 2>/dev/null)" && [ -n "${GH_TOKEN_TRY}" ]; then
  GH_TOKEN="${GH_TOKEN_TRY}"
elif GH_TOKEN_TRY="$(gh auth token 2>/dev/null)" && [ -n "${GH_TOKEN_TRY}" ]; then
  GH_TOKEN="${GH_TOKEN_TRY}"
fi

ANTHROPIC_AUTH_TOKEN="$(ocm auth litellm --site "${GATEWAY_SITE}" --key-type all)"

# Best-effort, unlike the tokens above: the workspace is fully usable without
# it — only the ord-skills Jira/Confluence scripts need it (they call
# `ocm auth atlassian`, which the image's ocm shim answers with this token).
# Scoped to match what those scripts request so the skill's own scope check
# passes. A failure here (e.g. no host Atlassian session) is a warning, not a
# fatal error, so it never blocks launching the workspace.
OCM_ATLASSIAN_TOKEN=""
if OCM_ATLASSIAN_TOKEN_TRY="$(ocm auth atlassian --product jira --scopes read:jira-work,write:jira-work,read:jira-user 2>/dev/null)" && [ -n "${OCM_ATLASSIAN_TOKEN_TRY}" ]; then
  OCM_ATLASSIAN_TOKEN="${OCM_ATLASSIAN_TOKEN_TRY}"
else
  echo "warning: could not derive OCM_ATLASSIAN_TOKEN via 'ocm auth atlassian' — Jira/Confluence skills will be unavailable in the container" >&2
fi

# Same best-effort contract as the Atlassian token above: only the ord-skills
# Bacon and aurm scripts need it, to authenticate to Aperture. The broker
# serves `ocm auth aurm` live once it is running; this pre-minted copy covers
# the window before that and a broker outage.
OCM_AURM_TOKEN=""
# `tail -n 1` because a first-time or expired login makes ocm print a device-code
# prompt line to stdout ahead of the token; capturing all of stdout would store
# that preamble as the token and produce a confusing 401 later.
if OCM_AURM_TOKEN_TRY="$(ocm auth aurm 2>/dev/null | tail -n 1)" && [ -n "${OCM_AURM_TOKEN_TRY}" ]; then
  OCM_AURM_TOKEN="${OCM_AURM_TOKEN_TRY}"
else
  echo "warning: could not derive OCM_AURM_TOKEN via 'ocm auth aurm' — Bacon CI skills will be unavailable in the container" >&2
fi

if [ -z "${NPM_TOKEN}" ]; then
  echo "error: could not derive NPM_TOKEN via 'ocm auth artifactory'" >&2
  exit 1
fi
if [ -z "${GH_TOKEN}" ]; then
  echo "error: could not derive GH_TOKEN via 'ocm auth github' or 'gh auth token'" >&2
  exit 1
fi
if [ -z "${ANTHROPIC_AUTH_TOKEN}" ]; then
  echo "error: could not derive ANTHROPIC_AUTH_TOKEN via 'ocm auth litellm --site ${GATEWAY_SITE} --key-type all'" >&2
  exit 1
fi

# Commits made inside the container must be authored by you, not a generic
# bot identity — PRs also require Verified (signed) commits to merge, so a
# host signing key is mandatory here rather than best-effort.
GIT_USER_NAME="$(git config --global --get user.name || true)"
GIT_USER_EMAIL="$(git config --global --get user.email || true)"
GPG_KEY_ID="$(git config --global --get user.signingkey || true)"

if [ -z "${GIT_USER_NAME}" ] || [ -z "${GIT_USER_EMAIL}" ]; then
  echo "error: host git identity not configured — run 'git config --global user.name \"...\"' and 'user.email \"...\"' first" >&2
  exit 1
fi
mkdir -p "${WORKSPACE_ENV_DIR}"

if [ "${NO_SIGN}" -eq 1 ]; then
  # Headless bring-up: remove any previously exported key material so the
  # container's start command skips its GPG import (it keys off secret.asc's
  # presence) and does not configure commit.gpgsign.
  rm -rf "${WORKSPACE_ENV_DIR}/gpg"
  echo "note: --no-sign set — commit signing is DISABLED in this workspace."
  echo "      re-run without --no-sign (you'll be prompted for your GPG passphrase) to enable signed commits."
else
  if [ -z "${GPG_KEY_ID}" ]; then
    echo "error: no host 'user.signingkey' configured — run 'git config --global user.signingkey <keyid>' first" >&2
    exit 1
  fi

  # One passphrase entry, not two. gpg --export-secret-keys would otherwise pop
  # the macOS pinentry to unlock the key, on top of the CLI prompt below that
  # captures the passphrase for the container's gpg-agent — the same secret
  # entered twice. Instead, prompt once at the CLI and feed that passphrase to
  # the export via loopback pinentry, so no macOS prompt appears. Loopback needs
  # the host gpg-agent to permit it; enable it idempotently. This is additive —
  # pinentry-mac stays the default for all normal gpg use; it only lets a caller
  # that explicitly asks for loopback (like the export below) use it.
  GNUPGHOME_DIR="${GNUPGHOME:-${HOME}/.gnupg}"
  GPG_AGENT_CONF="${GNUPGHOME_DIR}/gpg-agent.conf"
  mkdir -m 700 -p "${GNUPGHOME_DIR}"
  if ! grep -qxF 'allow-loopback-pinentry' "${GPG_AGENT_CONF}" 2>/dev/null; then
    echo 'allow-loopback-pinentry' >>"${GPG_AGENT_CONF}"
    gpgconf --reload gpg-agent 2>/dev/null || true
  fi

  # Exported into a 700 directory mounted read-only into the container (see
  # docker-compose.yml) — the secret key material never gets baked into the
  # image. The passphrase is cached in the container's own gpg-agent on start
  # (see docker-compose.yml's command) rather than re-entered on every commit,
  # so unattended `claude` sessions can sign without a pinentry prompt.
  GPG_EXPORT_DIR="${WORKSPACE_ENV_DIR}/gpg"
  mkdir -m 700 -p "${GPG_EXPORT_DIR}"
  GPG_PASSPHRASE_FILE="${GPG_EXPORT_DIR}/passphrase"

  # Resolve the passphrase before exporting: reuse the stored one on a re-launch
  # (no prompt at all), otherwise prompt once. -s not -f: an empty passphrase
  # file (a prior launch where the prompt got no input) must re-prompt, otherwise
  # the container's gpg-agent warms with nothing and every signed commit fails
  # "No passphrase given". --refresh-auth always re-prompts.
  if [ ! -s "${GPG_PASSPHRASE_FILE}" ] || [ "${REFRESH_AUTH_ONLY}" -eq 1 ]; then
    # Loop until non-empty: a hidden prompt makes it easy to press Enter with no
    # input, which would silently store a 0-byte passphrase and break signing.
    GPG_PASSPHRASE=""
    while [ -z "${GPG_PASSPHRASE}" ]; do
      read -r -s -p "GPG passphrase for signing key ${GPG_KEY_ID} (stored 600 in ${GPG_PASSPHRASE_FILE}, mounted read-only into the container, never leaves this machine): " GPG_PASSPHRASE
      echo
      if [ -z "${GPG_PASSPHRASE}" ]; then
        echo "  no passphrase entered — try again (input is hidden; type it, then press Enter)" >&2
      fi
    done
    printf '%s' "${GPG_PASSPHRASE}" >"${GPG_PASSPHRASE_FILE}"
    chmod 600 "${GPG_PASSPHRASE_FILE}"
  fi

  gpg --armor --export "${GPG_KEY_ID}" >"${GPG_EXPORT_DIR}/public.asc"
  # Loopback + the resolved passphrase: unlocks the secret key for export without
  # the macOS pinentry. A wrong stored passphrase fails here rather than silently
  # producing a container that cannot sign — re-run with --refresh-auth to fix.
  if ! gpg --pinentry-mode loopback --passphrase-file "${GPG_PASSPHRASE_FILE}" \
    --armor --export-secret-keys "${GPG_KEY_ID}" >"${GPG_EXPORT_DIR}/secret.asc" ||
    [ ! -s "${GPG_EXPORT_DIR}/secret.asc" ]; then
    echo "error: GPG secret-key export failed — the stored passphrase for ${GPG_KEY_ID} may be wrong. Re-run with --refresh-auth to re-enter it." >&2
    exit 1
  fi
  gpg --export-ownertrust >"${GPG_EXPORT_DIR}/ownertrust.txt"
  chmod 600 "${GPG_EXPORT_DIR}"/*.asc "${GPG_EXPORT_DIR}/ownertrust.txt"
fi

TOKENS_FILE="${WORKSPACE_ENV_DIR}/tokens.env"
cat >"${TOKENS_FILE}" <<EOF
export ANTHROPIC_BASE_URL="${ANTHROPIC_BASE_URL}"
export ANTHROPIC_AUTH_TOKEN="${ANTHROPIC_AUTH_TOKEN}"
export NPM_TOKEN="${NPM_TOKEN}"
export GH_TOKEN="${GH_TOKEN}"
export OCM_ATLASSIAN_TOKEN="${OCM_ATLASSIAN_TOKEN}"
export OCM_AURM_TOKEN="${OCM_AURM_TOKEN}"
export GIT_USER_NAME="${GIT_USER_NAME}"
export GIT_USER_EMAIL="${GIT_USER_EMAIL}"
export GPG_KEY_ID="${GPG_KEY_ID}"
EOF
chmod 600 "${TOKENS_FILE}"

if [ "${REFRESH_AUTH_ONLY}" -eq 1 ]; then
  start_broker
  echo "refreshed tokens at ${TOKENS_FILE}"
  echo "already-running claude/codex sessions keep their old token until restarted;"
  echo "new terminals (and 'docker exec' shells) pick up the refresh automatically."
  exit 0
fi

if ! docker image inspect "${IMAGE_NAME}" >/dev/null 2>&1; then
  "${SCRIPT_DIR}/build-image.sh"
fi

# The container no longer bind-mounts the host okta/ tree — it uses a
# Linux-native volume and seeds its own clone (see docker-compose.yml). All the
# host provides is the odyssey clone URL, read from this repo's own origin so it
# is never hardcoded and works from a worktree too.
ODYSSEY_ORIGIN_URL="$(git -C "${SCRIPT_DIR}" remote get-url origin 2>/dev/null || echo "https://github.com/atko-eng/odyssey-design-system.git")"

HOST_CLAUDE_DIR="${HOST_CLAUDE_DIR:-${HOME}/.claude}"

# Carry the org's managed Claude Code policy into the container, minus the
# things that don't apply there. statusLine references an Okta-CPE script that
# only exists on managed macOS hosts, so it is stripped. apiKeyHelper is
# repointed at the container's own `ocm` shim (`ocm auth litellm … --key-type
# all`) rather than the host binary path: the shim forwards to the host
# token-broker, so the gateway key is re-minted on the host — opening the host
# browser if the session expired — instead of failing. Everything else — telemetry,
# MCP server allowlist, plugin trust, permission denies — still applies.
# Regenerated on every start (not baked into the image) so a policy
# update on the host is picked up on the next launch without a rebuild.
# `disableBypassPermissionsMode` and `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` are
# the two restrictions this workspace exists to lift: the former blocks
# `--dangerously-skip-permissions` outright, and the latter silently forces
# permission mode back to default even when that flag is passed. Every
# other org policy stays enforced.
HOST_MANAGED_SETTINGS="/Library/Application Support/ClaudeCode/managed-settings.json"
MANAGED_SETTINGS_FILE="${WORKSPACE_ENV_DIR}/managed-settings.json"
node - "${HOST_MANAGED_SETTINGS}" "${MANAGED_SETTINGS_FILE}" "ocm auth litellm --site ${GATEWAY_SITE} --key-type all" <<'JSEOF'
const fs = require("node:fs");

const [sourcePath, destPath, apiKeyHelper] = process.argv.slice(2);
const policy = fs.existsSync(sourcePath)
  ? JSON.parse(fs.readFileSync(sourcePath, "utf8"))
  : {};

policy.apiKeyHelper = apiKeyHelper;
delete policy.statusLine;
if (policy.permissions) {
  delete policy.permissions.disableBypassPermissionsMode;
}
if (policy.env) {
  delete policy.env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB;
}

fs.writeFileSync(destPath, JSON.stringify(policy, null, 2));
JSEOF

# The host reaches internal repos (iris, okta-core, …) not via SSH keys but via
# ~55 `url.https://github.com/.insteadOf org-<id>@github.com:` git rewrites, so
# those org-<id>@github.com: remotes resolve to https and authenticate with
# GH_TOKEN. Emit them as a gitconfig include the container merges in
# (workspace-init.sh sets include.path to it) — without them the container falls
# back to real SSH and fails `Permission denied (publickey)`. Grouped by base
# url so multiple rewrites collapse into one [url] section.
GIT_INSTEADOF_FILE="${WORKSPACE_ENV_DIR}/git-insteadof"
# `|| true`: a host with no url.insteadOf rewrites makes get-regexp exit 1, which
# under `set -o pipefail` would abort the launch. An empty include is fine — the
# container just gets no rewrites (only odyssey is seeded, needing none).
{ git config --global --get-regexp '^url\..*\.insteadof$' 2>/dev/null || true; } \
  | awk '{
      base = $1;
      sub(/^url\./, "", base);
      sub(/\.insteadof$/, "", base);
      if (base != last_base) { printf "[url \"%s\"]\n", base; last_base = base }
      printf "\tinsteadOf = %s\n", $2
    }' >"${GIT_INSTEADOF_FILE}"

# Every Okta MCP server is HTTP behind llm.atko.ai and authenticates via a
# headersHelper script. Copy the host's server definitions but repoint each
# headersHelper at the container's own copies (baked into the image), which mint
# tokens through the container ocm shim → host broker. Also pin a fixed OAuth
# callback port on every server: servers that need interactive OAuth
# (asana, google_*, slack, …) redirect to http://localhost:${MCP_OAUTH_CALLBACK_PORT}/callback,
# and that port is published host→container in docker-compose.yml, so consent
# completed in the host browser lands back on the container's listener without a
# paste step. Claude Code registers its own (per-machine) OAuth client here and
# stores the grant in the mounted ~/.claude/.credentials.json, which auto-refreshes
# — so it is auth-once-per-server, not repeated. Written as {"mcpServers": {…}}
# for workspace-init.sh to merge into ~/.claude.json.
MCP_OAUTH_CALLBACK_PORT=41414
MCP_SERVERS_FILE="${WORKSPACE_ENV_DIR}/mcp-servers.json"
HOST_CLAUDE_JSON="${HOME}/.claude.json"

# The host's `playwright` MCP is the gateway-hosted one, whose browser runs on
# remote infrastructure and therefore cannot reach the container's own dev servers
# on 127.0.0.1 (nor anything on your host). An agent in here reaching for the
# obvious name should get a browser that can actually see what it just started, so
# `playwright` is replaced with a container-local stdio server and the gateway one
# stays available as `playwright_gateway`.
#
# It points at the image's baked Chromium with --executable-path rather than naming
# `--browser chromium`. The image installs browsers with whatever Playwright version
# is current at build time (build 1234 today), while the container's clone resolves
# its own pinned Playwright from the lockfile, which looks for a different build
# number (1200) and fails with "Executable doesn't exist at
# /opt/ms-playwright/chromium_headless_shell-1200/…". An explicit path is immune to
# that skew, and the baked full Chromium runs headless fine.
#
# --user-data-dir is explicit because the default profile location is derived from
# PLAYWRIGHT_BROWSERS_PATH, which is root-owned in the image, so the browser fails
# to launch with "EACCES: permission denied, mkdir '/opt/ms-playwright/mcp-chrome-…'".
#
# Headless by necessity — there is no display in here — which makes it right for
# screenshots and DOM assertions and useless for watching a flow or typing a
# password; use `devshare` plus a host-side playwright-N for that.
#
# --output-dir points at the gallery directory so the console logs and page
# snapshots this server writes are viewable through `devshots`. Note it does NOT
# put screenshots there: @playwright/mcp returns those inline in the tool response
# and never writes them to disk, which is why the image also ships `shot` for
# captures a human needs to see.
#
# `bash -lc` because a stdio MCP entry takes command/args/env but no working
# directory. Requires the container's clone to have finished `yarn install`
# (workspace-init.sh); until then this server fails to start.
CONTAINER_PLAYWRIGHT_COMMAND="cd /home/agent/okta/odyssey-design-system && exec yarn workspace @okta/odyssey-prototype playwright-mcp --headless --executable-path /usr/local/bin/chromium --user-data-dir /home/agent/.playwright-mcp --output-dir /home/agent/.screenshots"
if [ -f "${HOST_CLAUDE_JSON}" ] && jq -e '.mcpServers // empty' "${HOST_CLAUDE_JSON}" >/dev/null 2>&1; then
  jq --argjson callbackPort "${MCP_OAUTH_CALLBACK_PORT}" '{
    mcpServers: (.mcpServers | with_entries(
      .value.headersHelper |= (
        if . == null then .
        elif endswith("fetch-github-mcp-headers.sh")
        then "/usr/local/lib/okta-mcp/fetch-github-mcp-headers.sh"
        else "/usr/local/lib/okta-mcp/fetch-mcp-headers.sh"
        end
      )
      | .value.oauth.callbackPort = $callbackPort
    ))
  }
  | .mcpServers.playwright_gateway = .mcpServers.playwright
  | .mcpServers.playwright = {
      type: "stdio",
      command: "bash",
      args: ["-lc", $playwrightCommand]
    }' --arg playwrightCommand "${CONTAINER_PLAYWRIGHT_COMMAND}" \
    "${HOST_CLAUDE_JSON}" >"${MCP_SERVERS_FILE}"
else
  echo "warning: no mcpServers found in ${HOST_CLAUDE_JSON} — the workspace will start with no MCP servers" >&2
  echo '{"mcpServers":{}}' >"${MCP_SERVERS_FILE}"
fi

cat >"${SCRIPT_DIR}/.env" <<EOF
ODYSSEY_ORIGIN_URL=${ODYSSEY_ORIGIN_URL}
HOST_CLAUDE_DIR=${HOST_CLAUDE_DIR}
EOF

start_broker

# The named volumes are declared `external` in docker-compose.yml, so Compose
# will not create them; ensure they exist first (idempotent, keeps existing
# data) so a fresh machine still comes up.
docker volume create odyssey-workspace-okta >/dev/null
docker volume create odyssey-workspace-t3 >/dev/null

# The workspace container has a fixed name, which is global across compose
# projects. A container left by a DIFFERENT project (e.g. the pre-rename
# claude-sandbox project) therefore blocks recreation here with a name conflict.
# It is disposable — all durable state lives in the external volumes and
# .workspace-env — so drop a stale one owned by another project before `up`. A
# container already owned by this project is left alone for `up` to reconcile.
EXISTING_PROJECT="$(docker inspect -f '{{ index .Config.Labels "com.docker.compose.project" }}' odyssey-workspace 2>/dev/null || true)"
if [ -n "${EXISTING_PROJECT}" ] && [ "${EXISTING_PROJECT}" != "${COMPOSE_PROJECT}" ]; then
  echo "removing stale odyssey-workspace container from compose project '${EXISTING_PROJECT}' (volumes kept)"
  docker rm -f odyssey-workspace >/dev/null
fi

docker compose -f "${COMPOSE_FILE}" up -d

echo "--- odyssey-workspace is running ---"
echo "t3code web GUI: http://localhost:3773  (open in your host browser to drive the container's agents)"
echo "In VSCode: Cmd+Shift+P -> 'Dev Containers: Attach to Running Container' -> odyssey-workspace"
echo "Then open folder /home/agent/okta (odyssey is seeded there; clone other repos beside it) and run:"
echo "  claude --dangerously-skip-permissions"
echo "(the flag works here because managed-settings.json, which blocks it on your host, doesn't exist in the container)"
echo "Refresh auth tokens later with: ${SCRIPT_DIR}/launch-workspace.sh --refresh-auth"
echo "Stop the workspace and token-broker with: ${SCRIPT_DIR}/launch-workspace.sh --stop"
