# Split into two stages: a `builder` that installs the global agent CLIs (Claude
# Code, Codex, t3code) and applies the codex.js MCP-header patch, and the final
# runtime image that carries only the resulting node_modules tree plus all the
# OS/browser/shim wiring. The CLIs are the one artifact set that copies cleanly
# across a stage boundary; the browser and its apt runtime libs stay in the
# runtime stage because `playwright install --with-deps` is the only reliable way
# to get that exact library set and it cannot be copied piecemeal.

# ---------------------------------------------------------------------------
# Builder: install the global agent CLIs, isolated from the runtime image.
# ---------------------------------------------------------------------------
FROM node:24-bookworm AS builder

# Corporate CA so npm's TLS to the registry (through the corporate proxy)
# validates during the global installs below.
ARG CA_CERT_FILE=corporate-ca.pem
COPY ${CA_CERT_FILE} /usr/local/share/ca-certificates/corporate-ca.crt
RUN update-ca-certificates
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

# Claude Code (the primary agent), Codex (ORD AI Codex pilot), and t3code (the
# web GUI that drives them). Baked here so the runtime image does not npx-fetch
# them on every container start, and so the runtime image carries no npm cache.
RUN npm install -g @anthropic-ai/claude-code @openai/codex t3

# Patch codex.js (the npm launcher every codex entry point runs) to mint the
# short-lived ODF AI Proxy MCP header tokens into the child env before it spawns
# the native binary. codex reads env_http_headers once at launch and has no
# per-request header command like Claude's headersHelper, so minting must happen
# per launch. This is done in codex.js, not a /usr/local/bin/codex PATH shim,
# because t3code launches codex as `node codex.js` directly and bypasses the
# shim, leaving its sessions without the MCP tokens.
RUN cat > /tmp/codex-mcp-headers-fragment.js <<'EOF'
// ORD AI workspace: mint short-lived ODF AI Proxy MCP header tokens into the
// child env so MCP servers authenticate on every launch path (CLI, exec, and
// t3code, which spawns `node codex.js` directly and bypasses any PATH shim).
// codex reads env_http_headers once at launch, so mint per launch.
try {
  const mcpSub = process.argv[2];
  const mcpSkip = new Set(["--version", "-V", "--help", "-h", "completion", "mcp", "logout"]);
  const mcpCommon = "/usr/local/lib/okta-mcp/mcp-headers-common.sh";
  if (!mcpSkip.has(mcpSub) && existsSync(mcpCommon)) {
    const { execSync } = require("node:child_process");
    const mcpSh = (cmd) => { try { return execSync(cmd, { encoding: "utf8" }).trim(); } catch { return ""; } };
    const litellmToken = mcpSh(`. ${mcpCommon}; fetch_litellm_token llm.atko.ai`);
    if (litellmToken) env.CODEX_LITELLM_HEADER = `Bearer ${litellmToken}`;
    const githubOrg = process.env.CODEX_GITHUB_ORG || "atko-eng";
    const githubToken = mcpSh(`. ${mcpCommon}; fetch_github_token ${githubOrg}`);
    if (githubToken) env.CODEX_GITHUB_HEADER = `Bearer ${githubToken}`;
  }
} catch { /* MCP header minting is best-effort */ }
EOF
RUN node -e "const fs=require('fs'); const p='/usr/local/lib/node_modules/@openai/codex/bin/codex.js'; const marker='const child = spawn(binaryPath'; const frag=fs.readFileSync('/tmp/codex-mcp-headers-fragment.js','utf8'); const s=fs.readFileSync(p,'utf8'); if(s.split(marker).length!==2){throw new Error('codex.js spawn marker not found exactly once');} fs.writeFileSync(p, s.replace(marker, frag+String.fromCharCode(10)+marker));"
RUN node --check /usr/local/lib/node_modules/@openai/codex/bin/codex.js
RUN rm -f /tmp/codex-mcp-headers-fragment.js

# ---------------------------------------------------------------------------
# Runtime: the odyssey-implementer-agent image.
# ---------------------------------------------------------------------------
FROM node:24-bookworm

ARG CA_CERT_FILE=corporate-ca.pem

COPY ${CA_CERT_FILE} /usr/local/share/ca-certificates/corporate-ca.crt
RUN update-ca-certificates

ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
ENV CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

# puppeteer (pulled transitively by @applitools/eyes-storybook) downloads
# chrome-headless-shell in its postinstall, which fails here (truncated fetch →
# Z_BUF_ERROR) and makes `yarn install` exit non-zero even though every package
# linked. The workspace runs builds/tests, not VRT (that is Bacon's job), and
# already has a Chromium via Playwright, so skip puppeteer's own download.
ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN apt-get update \
  && apt-get install -y --no-install-recommends git curl jq ca-certificates gnupg socat \
  && mkdir -p -m 755 /etc/apt/keyrings \
  && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    -o /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    > /etc/apt/sources.list.d/github-cli.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends gh \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Shared, world-readable location so the non-root `agent` user (created
# below) can find the browser regardless of its $HOME.
ENV PLAYWRIGHT_BROWSERS_PATH=/opt/ms-playwright

# Adds ~1 GB to the image; needed so odyssey-react-mui's vitest browser
# tests can run headless inside the container. Drop this layer and rely on
# --skip-tests (leaving browser/VRT tests to Bacon) to shrink the image.
RUN npx --yes playwright install --with-deps chromium \
  && chmod -R a+rX "${PLAYWRIGHT_BROWSERS_PATH}" \
  && ln -s "${PLAYWRIGHT_BROWSERS_PATH}"/chromium-*/chrome-linux/chrome /usr/local/bin/chromium

# The org's managed-settings.json sets apiKeyHelper to a real `ocm` command,
# which isn't installed here. This shim stands in for it. For an allowlisted
# `ocm auth <service>` it forwards the request — including the actual
# --product/--scopes/--force flags — to the host token-broker (ocm-broker.mjs)
# over the bind-mounted file-spool at /home/agent/.okta-broker, so a login
# that needs a browser (a broader Atlassian scope, an expired gateway key)
# happens on the HOST and returns a freshly scoped token. See agent-container.md.
#
# When no broker spool is mounted — the throwaway launch-implementer.sh
# container — it falls back to the static token pre-minted on the host into
# tokens.env, exactly as before: `auth litellm` (the apiKeyHelper call on
# every claude launch), `auth atlassian` (the ord-skills Jira/Confluence
# scripts) and `auth aurm` (the ord-skills Bacon and aurm scripts, which send
# it as the bearer token to Aperture). The broker fallback also covers a
# transient broker outage, so a hiccup never bricks a `claude` launch.
RUN cat > /usr/local/bin/ocm <<'EOF'
#!/bin/bash
source /home/agent/.okta-tokens.env 2>/dev/null || true
BROKER_DIR=/home/agent/.okta-broker

broker_request() {
  local service="$1"; shift
  local id req resp payload token error waited
  id="req-$(date +%s%N)-$$-${RANDOM}"
  req="${BROKER_DIR}/requests/${id}.json"
  resp="${BROKER_DIR}/responses/${id}.json"
  # Build the args JSON array from a stdin stream rather than jq --args: the
  # latter's handling of values that look like flags (--force, --product)
  # changed across jq versions, but -Rn + [inputs] is stable. The empty-$@
  # case is special-cased because `printf '%s\n'` with no args still emits one
  # blank line, which would become [""] instead of [].
  if [ "$#" -eq 0 ]; then
    payload="$(jq -nc --arg id "$id" --arg service "$service" '{id:$id,service:$service,args:[]}')" || return 1
  else
    payload="$(printf '%s\n' "$@" | jq -Rnc --arg id "$id" --arg service "$service" '{id:$id,service:$service,args:[inputs]}')" || return 1
  fi
  printf '%s' "$payload" > "${BROKER_DIR}/requests/.${id}.tmp" || return 1
  mv "${BROKER_DIR}/requests/.${id}.tmp" "$req" || return 1
  waited=0
  while [ ! -f "$resp" ]; do
    sleep 0.25
    waited=$((waited + 1))
    # ~185s: longer than the broker's own 180s ocm-auth timeout, so the
    # broker's error response wins the race over this client-side give-up.
    if [ "$waited" -ge 740 ]; then
      echo "ocm broker: timed out waiting for $service token" >&2
      rm -f "$req"
      return 1
    fi
  done
  token="$(jq -r '.token // empty' "$resp" 2>/dev/null)"
  error="$(jq -r '.error // empty' "$resp" 2>/dev/null)"
  rm -f "$resp"
  if [ -n "$token" ]; then
    printf '%s' "$token"
    return 0
  fi
  echo "ocm broker: ${error:-no token returned for $service}" >&2
  return 1
}

if [ "$1" = "auth" ]; then
  service="$2"
  case "$service" in
  litellm | atlassian | aurm | github | artifactory)
    shift 2
    if [ -d "${BROKER_DIR}/requests" ] && token="$(broker_request "$service" "$@")"; then
      printf '%s\n' "$token"
      exit 0
    fi
    case "$service" in
    litellm)
      printf '%s\n' "${ANTHROPIC_AUTH_TOKEN:?ANTHROPIC_AUTH_TOKEN not set}"
      exit 0
      ;;
    atlassian)
      printf '%s\n' "${OCM_ATLASSIAN_TOKEN:?OCM_ATLASSIAN_TOKEN not set — run launch-workspace.sh --refresh-auth on the host}"
      exit 0
      ;;
    aurm)
      printf '%s\n' "${OCM_AURM_TOKEN:?OCM_AURM_TOKEN not set — run launch-workspace.sh --refresh-auth on the host}"
      exit 0
      ;;
    *)
      echo "ocm: $service token unavailable (no broker and no pre-minted token)" >&2
      exit 127
      ;;
    esac
    ;;
  esac
fi
echo "ocm: not available in this container (args: $*)" >&2
exit 127
EOF
RUN chmod +x /usr/local/bin/ocm

# yarn/npm wrappers that keep ${NPM_TOKEN} — referenced by the repo's .yarnrc.yml
# and by ~/.npmrc/~/.yarnrc.yml — present and fresh for every install. The token
# is otherwise only injected into interactive shells (via .bashrc), so an
# agent-driven `yarn install` runs with it unset and Yarn hard-errors
# "Environment variable not found (NPM_TOKEN)"; and the token pre-minted into
# tokens.env at launch is short-lived, so a long-running workspace's install
# later fails "Invalid authentication" once it expires. Each wrapper re-mints a
# fresh Artifactory token through the ocm shim (→ host broker) before exec'ing
# the real CLI, falling back to any NPM_TOKEN already in the environment: the
# throwaway launch-implementer.sh container has no broker but passes NPM_TOKEN
# directly, and the fallback also rides out a transient broker outage. See
# agent-container.md and the 2026-08-04 decision record.
RUN cat > /usr/local/lib/okta-npm-auth.sh <<'EOF'
# Sourced by the yarn/npm wrappers. Refresh the short-lived Artifactory token
# through the ocm shim and export it as NPM_TOKEN, keeping any existing value on
# failure (no broker, or a transient outage).
if _npm_token="$(/usr/local/bin/ocm auth artifactory 2>/dev/null)" && [ -n "$_npm_token" ]; then
  export NPM_TOKEN="$_npm_token"
fi
EOF
# rm -f before cat: corepack/npm install these as symlinks, and `cat >` would
# follow the symlink and overwrite the real corepack/npm entrypoint the wrapper
# execs. Same guard the codex shim below uses.
RUN rm -f /usr/local/bin/yarn && cat > /usr/local/bin/yarn <<'EOF'
#!/bin/bash
. /usr/local/lib/okta-npm-auth.sh
exec /usr/local/bin/node /usr/local/lib/node_modules/corepack/dist/yarn.js "$@"
EOF
RUN rm -f /usr/local/bin/yarnpkg && cat > /usr/local/bin/yarnpkg <<'EOF'
#!/bin/bash
. /usr/local/lib/okta-npm-auth.sh
exec /usr/local/bin/node /usr/local/lib/node_modules/corepack/dist/yarnpkg.js "$@"
EOF
RUN rm -f /usr/local/bin/npm && cat > /usr/local/bin/npm <<'EOF'
#!/bin/bash
. /usr/local/lib/okta-npm-auth.sh
exec /usr/local/bin/node /usr/local/lib/node_modules/npm/bin/npm-cli.js "$@"
EOF
RUN chmod 644 /usr/local/lib/okta-npm-auth.sh \
  && chmod 755 /usr/local/bin/yarn /usr/local/bin/yarnpkg /usr/local/bin/npm

# Container copies of the host CPE MCP header helpers. Every Okta MCP server is
# HTTP behind llm.atko.ai and fetches its auth headers by running one of these,
# which mint a token through the `ocm` shim above (brokered to the host). No
# secret lives in these files. Two deliberate differences from the host CPE
# originals: the litellm token uses the long `--site` flag (the broker's
# allowlist accepts `--site`, not the host script's `-s`), and OCM_BIN is fixed
# to the shim rather than probed across homebrew paths that do not exist here.
RUN mkdir -p /usr/local/lib/okta-mcp
RUN cat > /usr/local/lib/okta-mcp/mcp-headers-common.sh <<'EOF'
# Shared helpers for the Claude MCP header entrypoints. Sourced; stays silent on
# success so callers emit only the final JSON headers object.
is_header_token() {
  case "$1" in
    ""|*[!A-Za-z0-9._-]*) return 1 ;;
    *) return 0 ;;
  esac
}

is_jwt() {
  _mcp_jwt="$1"
  case "$_mcp_jwt" in
    ""|.*|*.|*..*) return 1 ;;
    *.*.*) ;;
    *) return 1 ;;
  esac
  _mcp_jwt_header="${_mcp_jwt%%.*}"
  _mcp_jwt_rest="${_mcp_jwt#*.}"
  _mcp_jwt_payload="${_mcp_jwt_rest%%.*}"
  _mcp_jwt_signature="${_mcp_jwt_rest#*.}"
  case "$_mcp_jwt_signature" in
    *.*) return 1 ;;
  esac
  case "$_mcp_jwt_header$_mcp_jwt_payload$_mcp_jwt_signature" in
    *[!A-Za-z0-9_-]*) return 1 ;;
  esac
  [ -n "$_mcp_jwt_header" ] && [ -n "$_mcp_jwt_payload" ] && [ -n "$_mcp_jwt_signature" ]
}

OCM_BIN=/usr/local/bin/ocm

fetch_litellm_token() {
  _mcp_litellm_server="$1"
  _mcp_litellm_token="$("$OCM_BIN" auth litellm --site "$_mcp_litellm_server" 2>/dev/null)" || return 1
  is_jwt "$_mcp_litellm_token" || return 1
  is_header_token "$_mcp_litellm_token" || return 1
  printf '%s\n' "$_mcp_litellm_token"
}

fetch_github_token() {
  _mcp_github_scope="$1"
  _mcp_github_token="$("$OCM_BIN" auth github --scope="$_mcp_github_scope" 2>/dev/null)" || return 1
  is_header_token "$_mcp_github_token" || return 1
  printf '%s\n' "$_mcp_github_token"
}
EOF
RUN cat > /usr/local/lib/okta-mcp/fetch-mcp-headers.sh <<'EOF'
#!/bin/sh
set -e
: "${HOME:?HOME not set}"
. "${MCP_HEADERS_COMMON:-/usr/local/lib/okta-mcp/mcp-headers-common.sh}"
LITELLM_TOKEN="$(fetch_litellm_token llm.atko.ai)" || exit 1
printf '{"x-litellm-api-key":"Bearer %s"}\n' "$LITELLM_TOKEN"
EOF
RUN cat > /usr/local/lib/okta-mcp/fetch-github-mcp-headers.sh <<'EOF'
#!/bin/sh
set -e
: "${HOME:?HOME not set}"
. "${MCP_HEADERS_COMMON:-/usr/local/lib/okta-mcp/mcp-headers-common.sh}"

is_github_org() {
  github_org="$1"
  case "$1" in
    ""|*[!A-Za-z0-9-]*|-*|*-|*--*) return 1 ;;
  esac
  [ "${#github_org}" -le 39 ]
}

default_github_org() {
  if is_github_org "${DEFAULT_GITHUB_ORG:-}"; then
    printf '%s\n' "$DEFAULT_GITHUB_ORG"
    return 0
  fi
  printf '%s\n' atko-scratch
}

github_org_from_url() {
  url_org="$(printf '%s\n' "$1" | sed -nE \
    -e '1s#^git@github\.com:([A-Za-z0-9-]+)/[A-Za-z0-9._-]+(\.git)?/?$#\1#p' \
    -e '1s#^ssh://git@github\.com(:[0-9]+)?/([A-Za-z0-9-]+)/[A-Za-z0-9._-]+(\.git)?/?$#\2#p' \
    -e '1s#^https?://([^@/]+@)?github\.com/([A-Za-z0-9-]+)/[A-Za-z0-9._-]+(\.git)?/?$#\2#p' \
    | sed -n '1p')"
  if is_github_org "$url_org"; then
    printf '%s\n' "$url_org"
  fi
  return 0
}

github_org_from_git() {
  org="$(github_org_from_url "$(git remote get-url origin 2>/dev/null || true)")"
  if [ -n "$org" ]; then
    printf '%s\n' "$org"
    return 0
  fi
  git remote -v 2>/dev/null \
    | sed -n 's/^[^[:space:]]*[[:space:]][[:space:]]*\([^[:space:]]*\).*/\1/p' \
    | while IFS= read -r url; do github_org_from_url "$url"; done \
    | sed -n '1p'
}

github_org_from_env() {
  if is_github_org "${GITHUB_ORG:-}"; then
    printf '%s\n' "$GITHUB_ORG"
    return 0
  fi
  if is_github_org "${GITHUB_REPOSITORY_OWNER:-}"; then
    printf '%s\n' "$GITHUB_REPOSITORY_OWNER"
    return 0
  fi
  case "${GITHUB_REPOSITORY:-}" in
    */*)
      org="${GITHUB_REPOSITORY%%/*}"
      repo="${GITHUB_REPOSITORY#*/}"
      ;;
    *)
      org=""
      repo=""
      ;;
  esac
  if is_github_org "$org" && [ -n "$repo" ] && [ "$repo" = "${repo%%/*}" ]; then
    printf '%s\n' "$org"
  fi
  return 0
}

LITELLM_TOKEN="$(fetch_litellm_token llm.atko.ai)" || exit 1
ORG="$(github_org_from_env)"
is_github_org "$ORG" || ORG="$(github_org_from_git)"
is_github_org "$ORG" || ORG="$(default_github_org)"
is_github_org "$ORG" || exit 1
GITHUB_TOKEN="$(fetch_github_token "$ORG")" || exit 1
printf '{"x-litellm-api-key":"Bearer %s","Authorization":"Bearer %s"}\n' "$LITELLM_TOKEN" "$GITHUB_TOKEN"
EOF
# a+rx not a+rX: the helpers are created 644 by `cat >`, and capital X only adds
# execute to directories (or files already executable), so the scripts would stay
# non-executable and Claude Code's headersHelper exec would fail "Permission
# denied". Lowercase x makes the scripts runnable, matching the host CPE 755.
RUN chmod -R a+rx /usr/local/lib/okta-mcp

# The global agent CLIs (Claude Code, Codex incl. its codex.js MCP-header patch,
# and t3code) installed in the builder stage, plus their /usr/local/bin
# launchers. Copied rather than reinstalled so the runtime image carries no npm
# cache, and so a rebuild that only touches the runtime wiring reuses the CLI
# install layer.
COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
# claude and codex are self-contained launchers, so Docker dereferencing their
# npm symlinks into flat files is harmless. t3 is NOT: its bin (dist/bin.mjs) is
# code-split and imports sibling chunks (e.g. ./PtyAdapter-*.mjs) by relative
# path, which only resolve when the launcher runs from inside dist/. Copying it
# as a flat file lands it in /usr/local/bin/ where those chunks don't exist, so
# it must stay a symlink into node_modules — recreated below, not COPY'd.
COPY --from=builder /usr/local/bin/claude /usr/local/bin/codex /usr/local/bin/
RUN ln -s ../lib/node_modules/t3/dist/bin.mjs /usr/local/bin/t3
# Fail the build here rather than silently shipping an image whose CLIs never
# resolved: the wiring above depends on the builder's global bin names, so assert
# each launcher runs (not just resolves on PATH — t3's chunk imports only fail at
# load) and the codex patch survived the copy.
RUN command -v claude && command -v codex \
  && t3 --version \
  && node --check /usr/local/lib/node_modules/@openai/codex/bin/codex.js

# Container-side bring-up run once per start from docker-compose.yml's command,
# after the token/git/gpg wiring is in place. Kept as a baked script rather than
# inlined in the compose command so its git/clone/jq logic is readable without
# Compose's `$$` escaping. See agent-container.md.
RUN cat > /usr/local/bin/workspace-init.sh <<'EOF'
#!/usr/bin/env bash
set -uo pipefail
source /home/agent/.okta-tokens.env 2>/dev/null || true

# Apply the host's url.insteadOf rewrites so org-<id>@github.com: remotes
# (iris, okta-core, …) resolve to https and authenticate with GH_TOKEN — the
# container has no ocm ssh wrapper, so real SSH would fail publickey.
if [ -f /home/agent/.gitconfig-insteadof ]; then
  git config --global --replace-all include.path /home/agent/.gitconfig-insteadof
fi

# Linux-native checkout in the workspace volume, isolated from the host's macOS
# node_modules. Seed odyssey on first boot; other repos are cloned on demand
# (the insteadOf rewrites above make every Okta org reachable over https).
mkdir -p /home/agent/okta
if [ ! -e /home/agent/okta/odyssey-design-system/.git ] && [ -n "${ODYSSEY_ORIGIN_URL:-}" ]; then
  git clone "${ODYSSEY_ORIGIN_URL}" /home/agent/okta/odyssey-design-system || true
fi

# MCP server definitions (all http; auth via headersHelper → ocm shim). Merge
# into ~/.claude.json so Claude's own runtime state is preserved.
if [ -f /home/agent/.mcp-servers.json ]; then
  if [ -f /home/agent/.claude.json ]; then
    merged="$(mktemp)"
    jq -s '.[0] * .[1]' /home/agent/.claude.json /home/agent/.mcp-servers.json >"$merged" \
      && mv "$merged" /home/agent/.claude.json
  else
    cp /home/agent/.mcp-servers.json /home/agent/.claude.json
  fi
fi

# Codex config for the ORD AI Codex pilot: the provider points at the ODF AI
# Proxy (auth via the ocm shim), and MCP servers are limited to the two that
# authenticate with the litellm header alone — github and playwright. The
# browser-OAuth MCP servers cannot complete consent in this headless container,
# so they are intentionally omitted; use the ord-skills jira/confluence skills
# instead (see AGENTS.md below). The codex.js patch above mints the header tokens
# at launch, since codex reads env_http_headers only once.
mkdir -p /home/agent/.codex
cat > /home/agent/.codex/config.toml <<'CODEXEOF'
model = "gpt-5.3-codex"
model_provider = "litellm"
model_reasoning_effort = "high"

[model_providers.litellm]
name = "LiteLLM"
base_url = "https://llm.atko.ai/v1"
wire_api = "responses"

[model_providers.litellm.auth]
command = "/usr/local/bin/ocm"
args = ["auth", "litellm", "--site", "llm.atko.ai"]

[mcp_servers.playwright]
url = "https://llm.atko.ai/playwright/mcp"
env_http_headers = { "x-litellm-api-key" = "CODEX_LITELLM_HEADER" }

[mcp_servers.github]
url = "https://llm.atko.ai/github/mcp"
env_http_headers = { "x-litellm-api-key" = "CODEX_LITELLM_HEADER", "Authorization" = "CODEX_GITHUB_HEADER" }
CODEXEOF

# Cross-agent, container-scoped instructions at the workspace root, so any agent
# (Claude Code, Codex, …) working in a repo under /home/agent/okta reads it as an
# ancestor AGENTS.md. Container-only (never committed to a repo). Steers agents to
# the ord-skills jira/confluence skills — which authenticate non-interactively via
# `ocm auth atlassian` through the host broker — instead of the Atlassian MCP,
# whose interactive browser OAuth cannot complete in this headless container.
mkdir -p /home/agent/okta
cat > /home/agent/okta/AGENTS.md <<'AGENTSEOF'
# Workspace agent notes (dockerized agent container)

This is the persistent, headless Docker workspace container. These rules apply to
any agent working in any repo under `/home/agent/okta`.

## Jira and Confluence: use the ord-skills skills, not the Atlassian MCP

The Atlassian MCP server (and the other browser-OAuth MCP servers) require an
interactive browser consent that cannot complete in this headless container, so
those calls fail with "Needs authentication" or an upstream error. Do NOT try to
authenticate them here.

For Jira and Confluence, use the ord-skills `jira` and `confluence` skills. They
authenticate non-interactively via `ocm auth atlassian` through the host
token-broker — no browser. Prefer invoking the skill; its read scripts (e.g.
`get_jira_light.sh <KEY>`, `search_jira_jql.sh`) return issue data directly.
AGENTSEOF
EOF
RUN chmod +x /usr/local/bin/workspace-init.sh

# Flag-gated in-place upgrade of the baked agent CLIs to the versions declared in
# pinned-versions.json. A no-op unless WORKSPACE_SELF_UPDATE=1, so it is inert
# until container->Artifactory npm auth is confirmed. Runs as the non-root `agent`
# user (which owns the global npm prefix — chowned below) and installs from the
# internal Artifactory mirror, because the container has no public-registry
# egress. Kept as a baked script for the same reason as workspace-init.sh: its
# jq/npm logic reads clearly without Compose's `$$` escaping. See agent-container.md
# and the 2026-08-04 container-self-upgrade decision record.
RUN cat > /usr/local/bin/workspace-refresh.sh <<'EOF'
#!/usr/bin/env bash
set -uo pipefail
[ "${WORKSPACE_SELF_UPDATE:-0}" = "1" ] || exit 0

LOG=/home/agent/.workspace-refresh.log
log() { printf '%s workspace-refresh: %s\n' "$(date -u +%FT%TZ)" "$1" >>"$LOG"; }

# Prefer the manifest from the cloned repo, so bumping a version there and
# pulling rolls the container forward with no image rebuild. Fall back to the
# copy baked into the image (first boot, before the seed clone exists).
manifest=/usr/local/share/workspace/pinned-versions.json
repo_manifest=/home/agent/okta/odyssey-design-system/tools/agent-container/pinned-versions.json
[ -f "$repo_manifest" ] && manifest="$repo_manifest"
[ -f "$manifest" ] || { log "no manifest found; nothing to do"; exit 0; }

registry="${WORKSPACE_SELF_UPDATE_REGISTRY:-https://artifactory.es.atko.services/artifactory/api/npm/npm-okta-master/}"

names="$(jq -r '.packages | keys[]' "$manifest" 2>/dev/null)" ||
  { log "manifest parse failed: $manifest"; exit 0; }

for name in $names; do
  desired="$(jq -r --arg name "$name" '.packages[$name]' "$manifest")"
  installed="$(jq -r '.version // empty' "/usr/local/lib/node_modules/$name/package.json" 2>/dev/null)"
  if [ "$installed" = "$desired" ]; then
    log "$name already at $desired"
    continue
  fi
  log "upgrading $name: ${installed:-none} -> $desired"
  if npm install -g --registry "$registry" "$name@$desired" >>"$LOG" 2>&1; then
    log "upgraded $name to $desired"
  else
    log "FAILED to upgrade $name to $desired (check container->Artifactory npm auth)"
  fi
done
EOF
RUN chmod +x /usr/local/bin/workspace-refresh.sh

# Baked fallback for the version manifest (workspace-refresh.sh prefers the copy
# in the cloned repo when present). Copied late so bumping it only rebuilds this
# small tail of the image.
COPY pinned-versions.json /usr/local/share/workspace/pinned-versions.json

# Dev-app share proxy and the screenshot gallery. Vendored in this repo rather
# than fetched from a package registry at build time: the image must not depend on
# an external host being reachable during a build, and these are zero-dependency
# Node scripts that read clearly in review. docker-compose.yml launches the proxy
# on start and publishes only its data port; `devshots` starts the gallery on first
# use. See agent-container.md.
COPY dev-proxy.mjs shot-server.mjs shot devshare devshots /usr/local/bin/
RUN chmod 0755 /usr/local/bin/dev-proxy.mjs /usr/local/bin/shot-server.mjs \
  /usr/local/bin/shot /usr/local/bin/devshare /usr/local/bin/devshots

RUN useradd --create-home --shell /bin/bash agent \
  && git config --system --add safe.directory '*'

# Give `agent` ownership of the global npm prefix so workspace-refresh.sh can
# upgrade the baked CLIs in place at runtime (the sandbox has no root then).
# Ownership only — contents are unchanged, and a container recreate resets to
# these baked baseline versions.
RUN chown -R agent:agent /usr/local/lib/node_modules /usr/local/bin

USER agent

# Git identity and commit signing are NOT baked in here — both launch
# scripts derive them from the invoking host user (name, email, and GPG
# signing key) at run time and configure them inside the container on
# start. PRs require verified, human-authored commits, so there is no
# generic fallback identity: a host without a configured signing key
# fails the launch scripts outright rather than producing unsigned or
# bot-authored commits.

# A repo's own .yarnrc.yml only pins npmAuthToken for the @okta scope; the rest
# of npm's dependency graph resolves through the same internal Artifactory
# mirror and needs the matching host-side global ~/.yarnrc.yml registry entries,
# or every non-@okta package fails with "Invalid authentication". A repo without
# its own npmRegistryServer (e.g. a freshly cloned iris / okta-core) falls back
# to the default set here rather than the public registry. Mirrors the host
# global ~/.yarnrc.yml. ${NPM_TOKEN} resolves from the container's environment
# at install time — no secret is baked into the image.
RUN mkdir -p /home/agent/.yarn && cat > /home/agent/.yarnrc.yml <<'EOF'
npmRegistryServer: "https://artifactory.es.atko.services/artifactory/api/npm/npm-okta-master/"
npmRegistries:
  "https://artifactory.es.atko.services/artifactory/api/npm/npm-okta-master":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
  "https://artifacts.aue1e.internal/artifactory/api/npm/npm-okta-master":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
  "https://artifacts.aue1e.internal/artifactory/api/npm/npm-okta-release":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
  "https://artifacts.aue1e.internal/artifactory/api/npm/npm-okta-all":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
  "https://artifacts.aue1e.internal/artifactory/api/npm/npm-internal":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
  "https://artifacts.aue1e.internal/artifactory/api/npm/npm-upstream":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
  "https://artifacts.aue1e.internal/artifactory/api/npm/npm-topic":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
EOF

# npm (not yarn) reads ~/.npmrc; tools that shell out to npm inside the container
# need the same internal registry auth. Mirrors the host global ~/.npmrc, with
# ${NPM_TOKEN} expanded from the environment (npm expands ${VAR} in .npmrc) so no
# secret is baked into the image.
RUN cat > /home/agent/.npmrc <<'EOF'
progress=false
strict-ssl=true
always-auth=true
//artifacts.aue1e.internal/artifactory/api/npm/npm-okta-master/:_authToken=${NPM_TOKEN}
//artifacts.aue1e.internal/artifactory/api/npm/npm-okta-all/:_authToken=${NPM_TOKEN}
EOF

# Create the named-volume mountpoints owned by agent so the volumes (declared in
# docker-compose.yml) initialize with agent ownership rather than root:
#   /home/agent/okta  — the Linux-native repo checkout, kept off the host's
#                       macOS node_modules.
#   /home/agent/.t3   — t3code's runtime state (state.sqlite, its pairing/signing
#                       secret). Persisting it means a container recreate does not
#                       rotate the pairing token / invalidate paired browsers.
RUN mkdir -p /home/agent/okta /home/agent/.t3

WORKDIR /workspace/odyssey

ENTRYPOINT ["/bin/bash"]
