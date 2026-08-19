#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git -C "${SCRIPT_DIR}" rev-parse --show-toplevel)"
IMAGE_NAME="odyssey-implementer-agent"

BRANCH=""
PLAN_PATH=""
BASE_REF=""
SKIP_INSTALL=0
SKIP_TESTS=0
MAX_TURNS=80

while [ $# -gt 0 ]; do
  case "$1" in
  --branch)
    BRANCH="$2"
    shift 2
    ;;
  --plan)
    PLAN_PATH="$2"
    shift 2
    ;;
  --base)
    BASE_REF="$2"
    shift 2
    ;;
  --skip-install)
    SKIP_INSTALL=1
    shift
    ;;
  --skip-tests)
    SKIP_TESTS=1
    shift
    ;;
  --max-turns)
    MAX_TURNS="$2"
    shift 2
    ;;
  *)
    echo "error: unknown argument: $1" >&2
    exit 1
    ;;
  esac
done

if [ -z "${BRANCH}" ] || [ -z "${PLAN_PATH}" ]; then
  echo "usage: launch-implementer.sh --branch <name> --plan <plan.md> [--base <ref>] [--skip-install] [--skip-tests] [--max-turns N]" >&2
  exit 1
fi

if [ -z "${BASE_REF}" ]; then
  BASE_REF="$(git -C "${REPO_ROOT}" rev-parse --abbrev-ref HEAD)"
fi

PLAN_PATH="$(cd "$(dirname "${PLAN_PATH}")" && pwd)/$(basename "${PLAN_PATH}")"

WORKTREES_DIR="${WORKTREES_DIR:-${HOME}/okta/odyssey-worktrees}"
WORKTREE_DIR="${WORKTREES_DIR}/${BRANCH}"

mkdir -p "${WORKTREES_DIR}"
if [ -d "${WORKTREE_DIR}" ]; then
  echo "reusing existing worktree at ${WORKTREE_DIR}"
else
  git -C "${REPO_ROOT}" worktree add -b "${BRANCH}" "${WORKTREE_DIR}" "${BASE_REF}"
fi

MAIN_GIT_DIR="$(git -C "${REPO_ROOT}" rev-parse --path-format=absolute --git-common-dir)"

ANTHROPIC_BASE_URL="${ANTHROPIC_BASE_URL:-https://llm.es.atko.services}"
GATEWAY_SITE="${ANTHROPIC_BASE_URL#https://}"

NPM_TOKEN="$(ocm auth artifactory)"

# Capture each source's output only when it actually exits 0. `ocm auth
# github` can exit non-zero while still printing junk to stdout; a naive
# `ocm ... || gh auth token` would concatenate that junk with the fallback
# token and produce a malformed, multi-line credential.
GH_TOKEN=""
if GH_TOKEN_TRY="$(ocm auth github 2>/dev/null)" && [ -n "${GH_TOKEN_TRY}" ]; then
  GH_TOKEN="${GH_TOKEN_TRY}"
elif GH_TOKEN_TRY="$(gh auth token 2>/dev/null)" && [ -n "${GH_TOKEN_TRY}" ]; then
  GH_TOKEN="${GH_TOKEN_TRY}"
fi

# Mint the gateway's own `sk-` API key, matching the host's Claude Code
# `apiKeyHelper`. Bare `ocm auth litellm` returns a raw SSO/ID token the
# gateway rejects with a 401; `--key-type all` is what yields the API key.
ANTHROPIC_AUTH_TOKEN="$(ocm auth litellm --site "${GATEWAY_SITE}" --key-type all)"

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

# Commits this one-shot container produces must be authored by you, not a
# generic bot identity — PRs also require Verified (signed) commits to
# merge, so a host signing key is mandatory here rather than best-effort.
GIT_USER_NAME="$(git -C "${REPO_ROOT}" config --get user.name || true)"
GIT_USER_EMAIL="$(git -C "${REPO_ROOT}" config --get user.email || true)"
GPG_KEY_ID="$(git -C "${REPO_ROOT}" config --get user.signingkey || true)"

if [ -z "${GIT_USER_NAME}" ] || [ -z "${GIT_USER_EMAIL}" ]; then
  echo "error: host git identity not configured — run 'git config --global user.name \"...\"' and 'user.email \"...\"' first" >&2
  exit 1
fi
if [ -z "${GPG_KEY_ID}" ]; then
  echo "error: no host 'user.signingkey' configured — run 'git config --global user.signingkey <keyid>' first" >&2
  exit 1
fi

if ! docker image inspect "${IMAGE_NAME}" >/dev/null 2>&1; then
  "${SCRIPT_DIR}/build-image.sh"
fi

CLAUDE_HOME="$(mktemp -d)"
# Exported fresh per invocation into a throwaway dir removed on exit —
# never baked into the image, never persisted alongside the workspace's
# longer-lived .workspace-env/gpg (see docker-compose.yml). The passphrase
# is cached in the container's own gpg-agent (see CONTAINER_SCRIPT) rather
# than re-entered anywhere else, so the unattended `claude -p` run below
# can sign its commit without a pinentry prompt.
GPG_EXPORT_DIR="$(mktemp -d)"
trap 'rm -rf "${CLAUDE_HOME}" "${GPG_EXPORT_DIR}"' EXIT
gpg --armor --export "${GPG_KEY_ID}" >"${GPG_EXPORT_DIR}/public.asc"
gpg --armor --export-secret-keys "${GPG_KEY_ID}" >"${GPG_EXPORT_DIR}/secret.asc"
gpg --export-ownertrust >"${GPG_EXPORT_DIR}/ownertrust.txt"
chmod 600 "${GPG_EXPORT_DIR}"/*.asc "${GPG_EXPORT_DIR}/ownertrust.txt"
read -r -s -p "GPG passphrase for signing key ${GPG_KEY_ID} (held only in a throwaway temp dir for this one-shot container, deleted on exit): " GPG_PASSPHRASE
echo
printf '%s' "${GPG_PASSPHRASE}" >"${GPG_EXPORT_DIR}/passphrase"
chmod 600 "${GPG_EXPORT_DIR}/passphrase"

# Bypass mode is safe here: the container is throwaway, non-root, and has no
# host credentials or MCP servers. `--dangerously-skip-permissions` below is
# a full permission bypass regardless of what's set here, so an explicit
# allowlist would be dead code — see agent-container.md for what is (and
# isn't) actually enforced.
cat >"${CLAUDE_HOME}/settings.json" <<EOF
{
  "defaultMode": "bypassPermissions",
  "additionalDirectories": ["/workspace"]
}
EOF

CONTAINER_NAME="implementer-${BRANCH}"
MOUNTS=(
  -v "${WORKTREE_DIR}:/workspace/odyssey"
  -v "${MAIN_GIT_DIR}:${MAIN_GIT_DIR}"
  -v "${PLAN_PATH}:/workspace/plan.md:ro"
  -v "${SCRIPT_DIR}/implement.md:/workspace/implement.md:ro"
  -v "${CLAUDE_HOME}:/home/agent/.claude"
  -v "${GPG_EXPORT_DIR}:/home/agent/.gpg-import:ro"
)

INSTALL_STEP="yarn install"
if [ "${SKIP_INSTALL}" -eq 1 ]; then
  INSTALL_STEP="echo 'skipping yarn install (--skip-install)'"
fi

# The gate the agent must run before committing, injected into its prompt below
# so --skip-tests actually changes what runs. Browser/VRT tests are Bacon's job,
# so --skip-tests drops the slow `yarn test` step and gates on typecheck + lint.
GATE_CMD="yarn typecheck && yarn lint && yarn test"
if [ "${SKIP_TESTS}" -eq 1 ]; then
  GATE_CMD="yarn typecheck && yarn lint"
fi

CONTAINER_SCRIPT=$(
  cat <<'INNER'
set -euo pipefail
git config --global credential.helper '!f() { echo "username=x-access-token"; echo "password=${GH_TOKEN}"; }; f'
git config --global user.name "${GIT_USER_NAME}"
git config --global user.email "${GIT_USER_EMAIL}"
mkdir -p /home/agent/.gnupg
chmod 700 /home/agent/.gnupg
gpg --batch --import /home/agent/.gpg-import/public.asc 2>/dev/null || true
gpg --batch --import /home/agent/.gpg-import/secret.asc 2>/dev/null
gpg --import-ownertrust /home/agent/.gpg-import/ownertrust.txt 2>/dev/null || true
echo 'allow-loopback-pinentry' >> /home/agent/.gnupg/gpg-agent.conf
echo 'default-cache-ttl 86400' >> /home/agent/.gnupg/gpg-agent.conf
echo 'max-cache-ttl 86400' >> /home/agent/.gnupg/gpg-agent.conf
echo 'pinentry-mode loopback' >> /home/agent/.gnupg/gpg.conf
gpgconf --kill gpg-agent 2>/dev/null || true
echo warm | gpg --batch --pinentry-mode loopback --passphrase-file /home/agent/.gpg-import/passphrase -o /dev/null -bsau "${GPG_KEY_ID}" 2>/dev/null || true
git config --global user.signingkey "${GPG_KEY_ID}"
git config --global commit.gpgsign true
cd /workspace/odyssey
git checkout -b "${BRANCH}" 2>/dev/null || git checkout "${BRANCH}"
INNER
)
CONTAINER_SCRIPT="${CONTAINER_SCRIPT}
${INSTALL_STEP}
claude -p \"\$(cat /workspace/implement.md)

---
GATE COMMAND FOR THIS RUN (run this exact command before committing):
${GATE_CMD}
---
THE FOLLOWING IS THE APPROVED PLAN. EXECUTE IT NOW.
---

\$(cat /workspace/plan.md)\" --model \"claude-opus-4-8[1m]\" --max-turns \"${MAX_TURNS}\" --dangerously-skip-permissions --verbose --output-format stream-json
"

docker run --rm \
  --name "${CONTAINER_NAME}" \
  --memory=16g \
  --cpus=8 \
  -e "ANTHROPIC_BASE_URL=${ANTHROPIC_BASE_URL}" \
  -e "ANTHROPIC_AUTH_TOKEN=${ANTHROPIC_AUTH_TOKEN}" \
  -e "NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt" \
  -e "NPM_TOKEN=${NPM_TOKEN}" \
  -e "GH_TOKEN=${GH_TOKEN}" \
  -e "BRANCH=${BRANCH}" \
  -e "HOME=/home/agent" \
  -e "GIT_USER_NAME=${GIT_USER_NAME}" \
  -e "GIT_USER_EMAIL=${GIT_USER_EMAIL}" \
  -e "GPG_KEY_ID=${GPG_KEY_ID}" \
  "${MOUNTS[@]}" \
  "${IMAGE_NAME}" \
  -c "${CONTAINER_SCRIPT}"

echo "--- PR for branch ${BRANCH} ---"
gh pr list --head "${BRANCH}" --json url --repo atko-eng/odyssey-design-system 2>/dev/null || true
