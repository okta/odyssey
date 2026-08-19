# Dockerized agent container

A headless, sandboxed Claude Code agent that takes an approved plan and
autonomously implements it — writes code, runs the gate, opens a PR — inside
a throwaway container, isolated from your main checkout and interactive
session.

Ported from the internal `atko-scratch/oin-ai-hub` coding-pipeline
Implementer and retargeted to Odyssey's Node 24 + Yarn 4 stack and the
LiteLLM gateway. Only the Docker sandbox shape was ported — the `/plan` and
`/document` knowledge-base agents from the original were not.

## What's isolated

This section describes the throwaway `launch-implementer.sh` container. The
persistent `launch-workspace.sh` workspace deliberately relaxes the first two
points — it registers MCP servers and reaches every internal repo; see
"Repos, git, and MCP in the workspace" below.

- **No MCP servers (throwaway implementer)** — the one-shot container has no
  MCP definitions. The persistent workspace does register them (all HTTP,
  authenticated through the `ocm` shim).
- **No host credentials baked in** — only short-lived `NPM_TOKEN`, `GH_TOKEN`,
  and `ANTHROPIC_AUTH_TOKEN` derived on the host and passed as environment
  variables. No SSH keys, no `~/.aws`, no credentials file mounted (mounting
  `~/.claude/.credentials.json` inside the already-mounted `.claude` directory
  fails under Docker Desktop's virtiofs, and OAuth session credentials can't
  refresh mid-run anyway). Internal git remotes need no SSH key: the workspace
  replays the host's `url.insteadOf` rewrites so `org-<id>@github.com:` URLs
  resolve to https and authenticate with `GH_TOKEN`.
- **Non-root user** — the container runs as a dedicated `agent` user, not
  root, limiting what a compromised or misbehaving process could reach on the
  host if it ever escaped the container.
- **Bypass permissions, not an allowlist** — the agent runs with
  `--dangerously-skip-permissions`, which is a full bypass and overrides any
  `permissions.allow` list regardless of what's in `settings.json`. There is
  no Claude-enforced branch lock or command allowlist; the isolation comes
  from the container being throwaway, non-root, and holding only short-lived
  tokens scoped to this run — not from permission checks. If you need
  Claude-enforced guardrails (e.g. blocking `git push --force` or `gh pr
merge`), drop `--dangerously-skip-permissions` and rely on an explicit
  `permissions.allow` list instead.

## Usage

```sh
tools/agent-container/launch-implementer.sh \
  --branch my-feature-branch \
  --plan /path/to/plan.md \
  --base master
```

| Flag               | Required | Meaning                                                                                                           |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `--branch <name>`  | yes      | Branch the container will work on and push to.                                                                    |
| `--plan <plan.md>` | yes      | The approved plan the agent executes verbatim.                                                                    |
| `--base <ref>`     | no       | Branch to fork the worktree from and to target with the PR. Defaults to the current branch of your main checkout. |
| `--skip-install`   | no       | Skip `yarn install` inside the container (useful when re-running against an already-installed worktree).          |
| `--skip-tests`     | no       | Narrow the gate to typecheck + lint; leaves browser/VRT tests to Bacon.                                           |
| `--max-turns N`    | no       | Cap on agent turns. Defaults to 80.                                                                               |

The launcher creates its own git worktree at
`${WORKTREES_DIR:-$HOME/okta/odyssey-worktrees}/<branch>` (reusing it if it
already exists), builds the `odyssey-implementer-agent` image if it isn't
present, derives `NPM_TOKEN`/`GH_TOKEN`/`ANTHROPIC_AUTH_TOKEN` on the host via
`ocm` (and `gh`), and runs the container. After the container exits, it prints
the resulting PR URL.

## Prerequisites

- Docker.
- `ocm auth artifactory` (Artifactory `NPM_TOKEN`), a GitHub token from either
  `ocm auth github` or `gh auth token`, and `ocm auth litellm --site <host>
--key-type all` (the gateway's `sk-` API key) must all succeed on the host —
  the launcher errors out if any token is empty. Deriving the gateway key with
  `--key-type all` matters: bare `ocm auth litellm` returns a raw SSO/ID token
  the gateway rejects with a 401.
- `ocm auth atlassian` (ord-skills Jira/Confluence scripts) and `ocm auth aurm`
  (ord-skills Bacon and aurm scripts, which send it to Aperture) are derived
  **best-effort**. Unlike the tokens above, a failure here is a warning, not a
  fatal error — the workspace still launches; only those skills are unavailable
  until the next successful `--refresh-auth`.
- A reachable corporate CA cert for the LiteLLM gateway and the internal npm
  registry, resolved from `$AWS_CA_BUNDLE`, then `$NODE_EXTRA_CA_CERTS`, then
  `~/.local/prisma_certificates.pem`.

## Persistent interactive workspace

`launch-implementer.sh` above is for **unattended** plan execution: a
throwaway container per task. This directory also has a **persistent**
workflow for daily-driving Claude Code (and, once wired up, Codex CLI)
interactively, attached to from your local VSCode window.

Motivation: this org's `managed-settings.json` blocks
`--dangerously-skip-permissions` on the host directly. A container is an
acceptable place to run in bypass mode because it's fully isolated — but
unlike the automated implementer, you don't want a new throwaway container
per command. You want one long-lived container you keep working inside,
possibly running several concurrent `claude`/`codex` sessions at once,
viewed and controlled from your normal local VSCode.

### How it works

VSCode's **Dev Containers: Attach to Running Container** runs the VS Code
Server and extension host _inside_ the target container. From Claude
Code's perspective (and any loopback/lock-file mechanism it relies on for
IDE integration), everything is local again — no custom relay or MCP
bridge required. "Multiple concurrent agents" just means opening multiple
integrated terminal panes in the attached window and running `claude` (or
later `codex`) in each; no `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` or other
orchestration is required. That env var is an optional future add if you
want in-session subagent coordination inside a single terminal's `claude`
invocation later — not built here, since a human keeps a terminal's
process tree alive during an interactive session, not automation.

### Starting the workspace

```sh
tools/agent-container/launch-workspace.sh
```

This builds the (shared) `odyssey-implementer-agent` image if missing,
derives `NPM_TOKEN`/`GH_TOKEN`/`ANTHROPIC_AUTH_TOKEN` the same way
`launch-implementer.sh` does, and starts the `odyssey-workspace` container
via `docker compose up -d` with `restart: unless-stopped`. The container's
`~/.claude` is bind-mounted from your real host `~/.claude` — session/chat
history is shared between host and container, not forked into a separate copy.

### Repos, git, and MCP in the workspace

The repo checkout is **not** a bind mount of your host `~/okta`. It is a
persistent, Linux-native Docker volume (`odyssey-workspace-okta`) mounted at
`/home/agent/okta`. The container runs its own `yarn install`, writing
Linux-native binaries (esbuild, swc, rollup, …); sharing the host tree would
overwrite the macOS binaries your host Storybook depends on. `workspace-init.sh`
seeds `odyssey-design-system` there on first boot (cloning from this repo's own
origin); clone any other repo beside it. The volume survives restarts and is
removed only with `docker volume rm odyssey-workspace-okta`.

`yarn`/`npm` are wrapped in the image so `yarn install` works from **any** shell,
including the non-interactive ones an agent spawns. The repo's `.yarnrc.yml` (and
the image's `~/.yarnrc.yml`/`~/.npmrc`) reference `${NPM_TOKEN}`, which is
otherwise only injected into interactive shells and is short-lived once minted.
The wrappers re-mint a fresh Artifactory token through the `ocm` shim (→ host
broker) and export `NPM_TOKEN` before running the real CLI, so installs no longer
fail with `Environment variable not found (NPM_TOKEN)` or, after the launch token
ages out, `Invalid authentication` — and no manual `--refresh-auth` is needed just
to install. When no broker is present (the throwaway `launch-implementer.sh`
container passes `NPM_TOKEN` directly) the wrappers keep the existing value.

Because the checkout is separate, sync work through git (commit and push from
inside), not through the host filesystem. Every internal Okta repo is reachable:
`launch-workspace.sh` captures the host's `url.insteadOf` rewrites into
`.workspace-env/git-insteadof`, and `workspace-init.sh` includes them in the
container's global gitconfig, so `org-<id>@github.com:` remotes resolve to https
and authenticate with `GH_TOKEN` — no SSH key in the container.

MCP servers are registered from your host `~/.claude.json`: `launch-workspace.sh`
copies the server definitions and repoints each `headersHelper` at a container
copy (baked into the image under `/usr/local/lib/okta-mcp/`). Those helpers mint
per-server tokens (`ocm auth litellm --site …`, `ocm auth github --scope=…`)
through the `ocm` shim, which brokers to the host. `workspace-init.sh` merges the
definitions into the container's `~/.claude.json`, so all of them show up in
`claude mcp list` and in t3code.

`github` and `playwright` connect on the header token alone. The rest
(`atlassian`, `google_*`, `slack`, `zoom`, `lucid`, `asana`) also require an
interactive **MCP OAuth** consent. For **Jira and Confluence, don't use the
Atlassian MCP** — use the ord-skills `jira`/`confluence` skills, which authenticate
non-interactively via `ocm auth atlassian` through the broker (this is enforced by
the workspace-root `AGENTS.md` that `workspace-init.sh` writes).

For the remaining OAuth servers, the workspace bridges the consent to your host
browser. Each server is configured with a fixed `oauth.callbackPort` (41414),
published host→container in `docker-compose.yml`. Claude Code binds its OAuth
callback listener to `127.0.0.1` only, but the published port arrives on the
container's external interface, so the container's `command` runs a `socat`
forwarder (`eth0:41414 → 127.0.0.1:41414`) to bridge the two. When a server needs
auth, run `claude mcp login <server>` in an interactive terminal (`docker exec -it`
or a t3code terminal); Claude prints the consent URL — open it in your host Chrome
and approve. The redirect to `http://localhost:41414/callback` flows host loopback
→ published port → `socat` → Claude's listener, so the code is captured with **no
paste step**. The grant is stored in the mounted `~/.claude/.credentials.json` and
auto-refreshes, so it's **auth-once-per-server**. Note Claude Code uses per-machine
Dynamic Client Registration, so the container registers its own OAuth client —
your host's existing grants cannot be reused, and the container must complete this
consent once itself.

### Codex CLI (ORD AI pilot)

Codex is baked into the image alongside Claude Code as a second in-container
agent for the ORD AI Codex pilot. `workspace-init.sh` seeds `~/.codex/config.toml`
with a `litellm` provider that points at the ODF AI Proxy (auth via the `ocm`
shim, same broker path as everything else) and two MCP servers, `github` and
`playwright`.

Those two authenticate to the gateway with the `x-litellm-api-key` header alone.
Codex has no per-request header helper like Claude's `headersHelper`; it reads a
server's `env_http_headers` once at launch. So the header tokens are minted per
launch and injected into the environment by a patch applied to the npm launcher
(`codex.js`) at build time. The patch is in `codex.js` rather than a
`/usr/local/bin/codex` wrapper on purpose: t3code launches Codex as
`node codex.js` directly and bypasses any `PATH` shim, so a wrapper would leave
t3code sessions without the tokens and their MCP servers would fail to
authenticate. `codex.js` is the one entry point every launch path shares.

Two gaps are deferred to follow-up PRs (tracked in Jira, linked to the Codex
integration story):

- **rtk is not installed in the container.** rtk ships no arm64 Linux binary that
  runs on the image's glibc (the only `aarch64` build needs glibc 2.39; the base
  is bookworm at 2.36, and the static musl build is x86_64 only). Getting it in
  needs either a base-image glibc bump or a multi-stage source build.
- **Browser-OAuth MCP servers are not wired for Codex** (slack, google, zoom,
  lucid, asana). Codex stores MCP OAuth tokens in the OS keyring only, and the
  headless container has no secret-service/dbus; `codex mcp login` also exposes no
  callback port to bridge to the host browser the way Claude's fixed `41414`
  callback is. It needs dbus + gnome-keyring plus a pinned, published callback
  port. Jira and Confluence are intentionally excluded from this: use the
  ord-skills `jira`/`confluence` skills, which authenticate through the broker with
  no browser (see the workspace-root `AGENTS.md`).

### Connecting to the workspace

Three ways to drive `claude` inside the running container, in order of
how much IDE integration you get. All three end up running the same
`claude --dangerously-skip-permissions` — the flag works here even
though it's blocked on your host; see "Carrying the managed policy into
the container" below for how the one restriction blocking it is lifted
while everything else in the org policy still applies.

#### Option A: VS Code (full IDE integration)

**Cmd+Shift+P → "Dev Containers: Attach to Running Container" →
odyssey-workspace**. No `devcontainer.json` is needed or provided — that
flag talks to the Docker API directly for a container you already
manage; it's "Reopen in Container" that wants a config file, and that
flow would fight with `docker compose` owning this container's
lifecycle. Once attached, open the folder printed by the script (your
`~/okta`, mounted at the same absolute path as on the host — so you can
work across any of your existing worktrees/repos from one session, not
just this repo's), open an integrated terminal, and run `claude
--dangerously-skip-permissions` (interactively — no `-p`). Open more
terminal tabs for more concurrent sessions.

This is the only option below that gets Claude Code's live IDE
integration (diagnostics, selection context) — that requires the VS Code
Server and extension host actually running _inside_ the container, which
only "Attach to Running Container" sets up. See the callouts right below
(Dev Containers extension, git-credential forwarding) — both are
required setup, not optional tips.

**Requires the "Dev Containers" extension**
(`ms-vscode-remote.remote-containers`), not the similarly-named "Container
Tools" extension (`ms-azuretools.vscode-containers`) — the latter's
"Containers: Attach Shell" only opens a plain shell and does not run the
VS Code Server / extension host inside the container, so Claude Code's
IDE-integration socket won't work. If the command palette doesn't offer
"Dev Containers: Attach to Running Container," install the extension and
reload the window.

**VS Code's own git-credential forwarding conflicts with this container's
token and must be disabled.** By default, attaching writes a forwarding
shim into both the container's `~/.gitconfig` and `/etc/gitconfig`
(controlled by `dev.containers.gitCredentialHelperConfigLocation`,
default `"global"`) that routes every git HTTPS request back through your
host's credential store. If your host's stored GitHub credential is a
legacy username/password rather than a token, every git operation inside
the container fails with `remote: Invalid username or token. Password
authentication is not supported for Git operations.` — and because git
tries configured credential helpers in order and stops at the first one
that answers, this shim shadows the container's own working
`.git-credential-helper.sh` (which sources `GH_TOKEN` from
`.workspace-env/tokens.env`) even when both are configured. Set, in VS
Code user settings:

```jsonc
"dev.containers.copyGitConfig": false,
"dev.containers.gitCredentialHelperConfigLocation": "none",
```

then fully quit and reopen VS Code (a window reload is not sufficient —
the setting is read at extension-activation time) before attaching.

**If the Claude Code panel in VS Code hangs with no response** (after a
container restart or a `managed-settings.json`/policy change in
particular), the extension's own backend `claude` process — separate from
anything you run manually in an integrated terminal — can get wedged
after re-reading settings mid-session. Find and kill it from a terminal
(integrated or `docker exec`), then retry in the panel; the extension
respawns it automatically:

```sh
docker exec odyssey-workspace pkill -f 'claude --output-format stream-json'
```

#### Option B: IntelliJ / other JetBrains IDEs (terminal-driven)

There's no JetBrains equivalent of VS Code's Dev Containers attach set
up here — that would need either a `devcontainer.json` (deliberately not
used; see Option A) or a JetBrains Gateway connection over SSH, which
would need an SSH server installed and enabled in the image (not done on
this branch). If you want that level of integration, it's a reasonable
future enhancement — ask before assuming it exists.

What works today: since `~/okta` is bind-mounted at the **same absolute
path** as on your host, you don't need to attach IntelliJ into the
container at all to edit files — keep IntelliJ open normally on the
host, editing the exact same files Claude edits inside the container.
Drive Claude itself from IntelliJ's built-in **Terminal** tool window:

```sh
docker exec -it odyssey-workspace bash
cd ~/okta/<repo-or-worktree>
claude --dangerously-skip-permissions
```

You lose the live diagnostics/selection-context integration Option A
gets (that's tied to VS Code's extension host running inside the
container), but everything else — bypass mode, file edits, git — works
identically, and IntelliJ picks up file changes on disk immediately
since it's the same mount.

#### Option C: Plain CLI, no IDE

If you don't want either IDE flow, this is the whole thing — any
terminal app, no editor attached to the container at all:

```sh
docker exec -it odyssey-workspace bash
cd ~/okta/<repo-or-worktree>
claude --dangerously-skip-permissions
```

Edit files with whatever you normally use on the host; they live at the
same path either way.

#### Option D: t3code web GUI (host browser)

For a browser-based control surface instead of an editor attach, the image
bakes in [t3code](https://github.com/pingdotgg/t3code) — a web GUI that drives
the agent CLIs already in the container (Claude Code here). `launch-workspace.sh`
starts it headless and publishes it to your host loopback, so you open it in a
normal browser:

```text
http://localhost:3773
```

t3code's pair screen asks for a one-time pairing token, which it writes to
its log on startup. Pull the current one (the `tail -1` matters: a container
restart rotates the token and appends a new line, so you want the latest, not
the first) and paste it into the pair screen, or open the whole URL:

```sh
docker exec odyssey-workspace \
  grep -o 'http://localhost:3773/pair#token=[A-Za-z0-9]*' /home/agent/.t3code.log | tail -1
```

If the pair screen reports `Invalid session token signature`, the token you
pasted is from an older container instance; re-run the command above to get
the live one.

It runs as `t3 --no-browser --host 0.0.0.0 --port 3773` inside the container
(see `docker-compose.yml`'s `command`), inheriting the same
`ANTHROPIC_AUTH_TOKEN` as every other session so the agents it spawns are
authenticated. The port is published as `127.0.0.1:3773:3773` — reachable from
your browser but **not** exposed to the LAN. Change the port with
`T3CODE_PORT`. This is an alternative to Options A–C, not a replacement: the
container still stays attachable and `docker exec`-able at the same time.

### Carrying the managed policy into the container

The container doesn't skip the org's `managed-settings.json` policy — it
carries it over, minus the parts that don't apply to a Linux container or
that this workspace exists to lift. On every `launch-workspace.sh` run,
the host's `/Library/Application Support/ClaudeCode/managed-settings.json`
is read, transformed, and written to `.workspace-env/managed-settings.json`,
mounted read-only at `/etc/claude-code/managed-settings.json` (the fixed
Linux path per Claude Code's enterprise policy docs). Telemetry, the MCP
server allowlist, plugin trust, and permission denies all still apply.
Stripped or replaced:

- **`permissions.disableBypassPermissionsMode`** — the one restriction
  this workspace exists to lift; without stripping it,
  `--dangerously-skip-permissions` is blocked outright.
- **`env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`** — silently forces permission
  mode back to `default` even when `--dangerously-skip-permissions` is
  passed, defeating bypass mode a second, less obvious way. Its hard
  requirement on `bubblewrap` is also why that package is **not** in this
  image — it's unused once the setting is dropped.
- **`statusLine`** — references an Okta-CPE script that only exists on
  managed macOS hosts.
- **`apiKeyHelper`** — the org value invokes a real `ocm` binary by an
  absolute host path that doesn't exist here. It is **repointed**, not
  stripped, to the container's own `/usr/local/bin/ocm` shim (`ocm auth
litellm … --key-type all`). That shim forwards to the host token-broker
  (see [Host token-broker](#host-token-broker-in-container-step-up-auth)
  below), so every `claude` launch gets a gateway key re-minted on the host —
  opening the host browser if the session expired — and falls back to the
  derived `ANTHROPIC_AUTH_TOKEN` if the broker is down. Repointing it in the
  transformed managed file also overrides any `apiKeyHelper` that leaks in at
  the **user level** from the bind-mounted host `~/.claude`. The same shim
  answers `ocm auth atlassian`/`aurm`/`github` the same way, so the ord-skills
  Jira/Confluence and Bacon scripts work in the container too.

Regenerated on every start (not baked into the image), so a policy update
on the host is picked up on the next launch without a rebuild.

### Host token-broker (in-container step-up auth)

The container is headless — no browser inside it — so an `ocm auth` that
needs an interactive login can't complete on its own: a broader Atlassian
scope (e.g. `write:jira-work`, which the read-scoped launch token doesn't
cover), an expired LiteLLM gateway key mid-session, or a fresh GitHub token.
`launch-workspace.sh` starts a small host daemon, `ocm-broker.mjs`, to close
that gap. When the container's `ocm` shim is asked for `litellm`,
`atlassian`, `aurm`, `github`, or `artifactory`, it forwards the request —
with the real `--product`/`--scopes`/`--force` flags — to the broker, which
runs the actual `ocm auth …` **on the host**, opening your host browser when a
login is required, and returns a freshly scoped token.

Transport is a file-spool under `.workspace-env/broker/` (`requests/` +
`responses/`), bind-mounted read-write at `/home/agent/.okta-broker` — not a
socket. A Unix socket created by a macOS-host process can't be connected to
from the Linux container under Docker Desktop, and TCP over
`host.docker.internal` would mean binding the broker to a VM-reachable
interface. The bind mount already carries files across the boundary reliably
(it is how `tokens.env` and the GPG keys get in), so the shim drops a request
file and polls for the response.

Security: this is a controlled, deliberately narrow hole in the container's
isolation. The broker only ever runs `ocm auth <allowlisted-service>` with an
allowlisted set of flags, via a fixed argv (never a shell) — it will not run
an arbitrary host command and exposes no host filesystem. The container can
_request_ a scoped token; it cannot reach anything else on the host. Tokens
flow out; nothing else flows in.

If the broker is down, the shim falls back to the static token pre-minted in
`tokens.env`, so a broker outage degrades to the previous behavior rather
than breaking a `claude` launch. The throwaway `launch-implementer.sh`
container has no broker mounted and uses only the static tokens.

Stop the workspace and its broker together with:

```sh
tools/agent-container/launch-workspace.sh --stop
```

### Auth token refresh

`ANTHROPIC_AUTH_TOKEN` (and the short-lived `OCM_ATLASSIAN_TOKEN` and
`OCM_AURM_TOKEN` used by the Jira/Confluence and Bacon skills) is a
gateway-minted token with a limited
lifetime. For a long-lived container this can expire mid-session. The host
token-broker above now re-mints these on demand (opening your host browser
if the session lapsed), so mid-session expiry is largely self-healing;
`--refresh-auth` remains the way to rotate the static fallback tokens in
`tokens.env`, the git/npm credentials that don't route through the shim, and
your exported GPG key material. Rather than
hot-patching a running process's environment (not possible from outside
the process) or restarting the container (which would kill every session
in every terminal), the token lives in a mounted file
(`.workspace-env/tokens.env`) that every _new_ interactive shell sources
via `~/.bashrc`. Refresh it with:

```sh
tools/agent-container/launch-workspace.sh --refresh-auth
```

This re-derives the tokens and rewrites the mounted file in place — no
restart. Any new terminal (or `docker exec` session) opened after this
picks up the refreshed token automatically. A `claude`/`codex` process
already running when the old token expired needs to be restarted (Ctrl-C,
rerun) to pick up the refresh — cheap for an interactive session, since a
human is right there to do it.

### Commit identity and signing

Commits made inside the container are authored as **you**, not a shared
bot identity, and are GPG-signed — GitHub requires a Verified signature to
merge here. Both launch scripts derive your host `git config` (`user.name`,
`user.email`, `user.signingkey`) and refuse to start without them, rather
than falling back to a generic identity that would produce unsigned or
misattributed commits.

`launch-workspace.sh` exports your GPG public key, secret key, and
ownertrust into `.workspace-env/gpg` (700, read-only mount into the
container) and prompts once for your signing key's passphrase, stored
alongside it. The container imports this into its own `~/.gnupg` on start
and warms `gpg-agent`'s passphrase cache via loopback pinentry, so `git
commit` — including from an unattended `claude` session — never hits a
pinentry prompt it can't answer. `launch-implementer.sh`'s one-shot
containers do the same, but into a throwaway temp directory removed when
the container exits, since there's no persistent workspace to reuse.

The exported secret key material and cached passphrase are why this is a
meaningful trust boundary: anything that runs inside the container can
produce commits signed with your real key. Re-run
`launch-workspace.sh --refresh-auth` if you rotate your signing key or
passphrase — it re-exports everything the same way it refreshes the auth
tokens above.

### What's different from `launch-implementer.sh`

|                  | `launch-implementer.sh`                        | `launch-workspace.sh`                                            |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| Lifetime         | one-shot, `--rm`                               | persistent, `restart: unless-stopped`                            |
| Repo checkout    | one worktree bind-mount + shared `.git`        | Linux-native volume at `/home/agent/okta`, its own clone(s)      |
| MCP servers      | none                                           | all host servers, tokens via the `ocm` shim                      |
| Invocation       | `claude -p ... --dangerously-skip-permissions` | interactive `claude`, see "Connecting to the workspace"          |
| `~/.claude`      | fresh `mktemp -d` per run                      | bind-mounted from your real host `~/.claude`                     |
| Auth tokens      | derived once per run                           | derived at start, refreshable in place                           |
| Attach mechanism | none (headless)                                | VS Code Dev Containers attach, or `docker exec` for IntelliJ/CLI |

See [the decision record](../../docs/decisions/2026-07-14-persistent-vscode-attached-docker-workspace.md)
for why this shape was chosen over a custom relay/MCP bridge, over
reusing the throwaway-per-task model, and over third-party unified-UI
wrappers.

## Sharing a dev server with your host browser

Dev servers started inside the container are invisible from the host, which blocks
the obvious workflow: an agent starts Storybook, then has no way to show you the
result or to point a real browser at it.

`devshare` closes that. Inside the container:

```sh
yarn workspace @okta/odyssey-storybook dev:storybook   # binds :6006
devshare 6006 storybook                                # prints the URL
```

That prints something like `http://storybook-a1b2.localhost:3774`, which you open
on the host. Other subcommands: `devshare list` shows what is shared, and
`devshare rm <id|port>` unregisters. Opening `http://localhost:3774/` lists every
active route as a clickable link, so you do not have to keep URLs around.

How it works: `dev-proxy.mjs` runs in the container with a data plane on 3774 (the
only published port) and a loopback-only control API on 3775 that `devshare` talks
to. The data plane reads the Host header's leftmost label as the route id and
forwards to `127.0.0.1:<port>` in the container. Websocket upgrades are bridged, so
Vite and Storybook HMR work through it, and the upstream `Host` is rewritten to
loopback so dev servers with host allow-lists do not reject the proxied request.

Two things that are easy to get wrong:

- **No DNS or `/etc/hosts` setup is needed.** macOS resolves any `*.localhost`
  label to 127.0.0.1, and Chromium implements the same rule, so the printed URL
  works as-is on a fresh machine.
- **Routing is by subdomain, not by a `/<id>` path prefix.** Dev servers emit
  root-absolute URLs (`/assets/*.js`, Storybook's `/sb-manager/*`, the HMR socket
  at `/`), which would all 404 under a path prefix unless every dev server were
  reconfigured with a matching base path.

The registry is in-memory, so a container recreate clears every shared URL. While
running, a liveness reaper drops a route after three consecutive failed probes, so
the list cannot fill up with dead entries.

## Screenshots from the container

Captures taken inside the container are invisible to you. Two commands cover it:

```sh
shot http://127.0.0.1:6006/ storybook.png   # capture a page into the gallery dir
shot http://127.0.0.1:6006/ --full-page     # whole scrollable page
devshots                                    # share the gallery, print its URL
devshots rm                                 # stop sharing (server keeps running)
```

The gallery lists every file newest-first as a clickable thumbnail with filename,
timestamp, and size. An agent finishing UI work should hand over that one URL rather
than describing what it saw.

**Why `shot` exists rather than the MCP's screenshot tool:** `@playwright/mcp`
returns screenshots inline in its tool response and does not write them to
`--output-dir`, so the agent can see the image but you cannot. `shot` writes a real
file, which is what the gallery can serve. It borrows Playwright from the container's
clone and launches the baked browser by explicit path.

The MCP's `--output-dir` still points at the same directory, so the console logs and
page snapshots it writes show up in the gallery too.

Screenshots are not on a named volume, so a container recreate clears them.

## Which Playwright MCP to use

There are three, and they are not interchangeable:

- **`playwright` inside the container** — a container-local stdio server on the
  image's bundled Chromium. It is the only one that can reach the container's own
  dev servers on `127.0.0.1`. Headless, because the container has no display: right
  for screenshots and DOM assertions, no use for watching a flow or typing a
  password. It runs from the container's clone, so it needs `yarn install` to have
  finished (`workspace-init.sh` does that on first boot).
- **`playwright-1` … `playwright-10` on the host** — headed browsers on your
  machine with persistent profiles under `~/.claude/playwright-profiles/N`, defined
  in the repo's checked-in `.mcp.json`. Use these when a human has to see the page
  or type credentials, pointed at a `devshare` URL. Take the lowest free number and
  move on to the next if the profile is locked, since another agent may hold it. One
  profile per agent keeps logins and captures from colliding.
- **`playwright_gateway` (called `playwright` at host user scope)** — the
  gateway-hosted browser. It runs on remote infrastructure, so it can reach public
  URLs but never your localhost or the container's. This is the one that produces
  "the browser runs out-of-process and can't reach the sandbox's Storybook".

`launch-workspace.sh` performs the swap when it generates `.workspace-env/mcp-servers.json`:
the host's `playwright` is preserved as `playwright_gateway`, and `playwright` is
replaced with the container-local server.

Because `.mcp.json` is project-scoped, Claude Code asks you to approve its servers
the first time you start a session in the repo. Until then `playwright-N` will not
appear in `claude mcp list`.

## Self-upgrading agent CLIs

The agent CLIs (Claude Code, Codex, t3code) are baked into the image at build
time. The container has no public-registry egress and runs as a non-root user, so
the in-app "update available" prompts cannot succeed — leave Codex/t3code provider
update checks off. Instead the workspace can upgrade the CLIs in place on start and
on an interval, pulling from the internal Artifactory npm mirror.

`workspace-refresh.sh` (baked into the image) reads
[`pinned-versions.json`](pinned-versions.json) and installs each listed package at
its pinned version into the global npm prefix, which `agent` owns (chowned at build
time). It prefers the manifest in the cloned repo over the baked fallback, so
bumping a version there and running `git pull` inside the workspace rolls the CLIs
forward with **no image rebuild**. It runs once before t3code starts (so t3code
launches on the upgraded binary) and then on a background interval.

`pinned-versions.json` is the source of truth — pin exact versions (a dist-tag like
`latest` reinstalls every run). Today it manages `@anthropic-ai/claude-code` only:
`@openai/codex` is excluded because an npm reinstall clobbers its
`/usr/local/bin/codex` launcher shim, and `t3` because the running GUI only adopts a
new binary on the next container start.

This is **off by default**. Enable it once container -> Artifactory npm auth is
confirmed by setting these in `.env` (read by `docker compose`):

```sh
WORKSPACE_SELF_UPDATE=1
# optional overrides:
WORKSPACE_SELF_UPDATE_INTERVAL=86400   # background re-check cadence, seconds
WORKSPACE_SELF_UPDATE_REGISTRY=https://artifactory.es.atko.services/artifactory/api/npm/npm-okta-master/
```

Progress and failures are logged to `/home/agent/.workspace-refresh.log` inside the
container. A container recreate resets the CLIs to the baked baseline versions,
after which the next start re-applies the manifest. See
[the decision record](../../docs/decisions/2026-08-04-container-self-upgrade.md).

## Troubleshooting

### Image changes don't take effect

`launch-workspace.sh` builds the image only when it is **missing**
(`docker image inspect`). After editing the `Dockerfile` (or anything baked into
the image — the `ocm` shim, the MCP header helpers, `workspace-init.sh`), it will
reuse the stale image and your changes silently do nothing. Rebuild explicitly:

```sh
tools/agent-container/build-image.sh
tools/agent-container/launch-workspace.sh   # recreates the container off the new image
```

Symptoms of running a stale image: `/home/agent/okta` empty (odyssey never
seeded), `claude mcp list` empty, `git clone org-<id>@github.com:…` fails
`Permission denied (publickey)` (the `insteadOf` rewrites live in
`workspace-init.sh`, which the old image lacks).

### MCP servers fail to authenticate (github especially)

MCP header helpers mint tokens through the `ocm` shim → host broker
(`ocm-broker.mjs`). If a helper produces no headers, check
`.workspace-env/broker.log` for a rejection (e.g. `flag not allowed: --scope`).
`launch-workspace.sh`'s `start_broker` is a no-op when a broker is already
running, so **editing `ocm-broker.mjs` does not take effect until you restart the
broker** — it keeps serving the old code. Restart it:

```sh
kill "$(cat tools/agent-container/.workspace-env/broker.pid)"
tools/agent-container/launch-workspace.sh --refresh-auth   # start_broker relaunches it
```

Test a helper directly (tokens redacted): `docker exec odyssey-workspace
/usr/local/lib/okta-mcp/fetch-mcp-headers.sh`.

### `/home/agent/okta` owned by root / clones fail with permission denied

The named volume takes its initial ownership from the image's `/home/agent/okta`.
An image built before that directory was created as `agent` initializes the
volume **root-owned**, so clones as `agent` fail at `mkdir`. Fix the live volume
without losing its contents:

```sh
docker exec -u root odyssey-workspace chown -R agent:agent /home/agent/okta
```

A rebuilt image creates the directory `agent`-owned, so a fresh volume does not
hit this. Existing volumes keep their contents (and this chown) across a rebuild.

### Signed commits fail with "No passphrase given"

The container's gpg-agent is warmed once, at container start, from
`.workspace-env/gpg/passphrase` (mounted read-only). Two failure modes:

- **The passphrase file is empty (0 bytes).** `--refresh-auth` re-prompts and
  now refuses to store an empty value; enter the passphrase (input is hidden —
  type it, do not expect an echo, then press Enter). Verify with
  `ls -la tools/agent-container/.workspace-env/gpg/passphrase` (size > 0).
- **The file is correct but the agent was warmed before it was populated (or the
  24h cache expired, or the container was recreated).** Re-warm by restarting the
  container — the passphrase file persists, so no re-prompt:

  ```sh
  docker restart odyssey-workspace
  ```

Confirm signing works (no secret printed):

```sh
docker exec odyssey-workspace bash -lc 'echo test | gpg --batch --no-tty -o /dev/null -bsau "$(git config --global user.signingkey)" && echo OK'
```

### t3code pairing token

t3code's runtime state (`/home/agent/.t3`, including its signing secret) lives on
the `odyssey-workspace-t3` named volume, so the pairing token **persists across
container recreates** — you should not need to re-pair on a normal relaunch. It
rotates only when that volume is first created (or if you `docker volume rm
odyssey-workspace-t3`). If a browser reports `Invalid session token signature`
after such a reset, pull the current token from the log:

```sh
docker exec odyssey-workspace grep -o 'http://localhost:3773/pair#token=[A-Za-z0-9]*' /home/agent/.t3code.log | tail -1
```

### Opus 4.8 is capped at 200K; you want the 1M context window

On the LiteLLM gateway, 1M context is not a toggle on the 200K model — it is a
separate model ID, `claude-opus-4-8[1m]`. Select that ID in t3code's model picker
(or set `ANTHROPIC_MODEL=claude-opus-4-8[1m]`). The plain `claude-opus-4-8`
always resolves to the 200K variant.

### Where are the repos on my Mac?

They are not on the Mac filesystem. `/home/agent/okta` is a named Docker volume
(`odyssey-workspace-okta`) living inside Docker Desktop's Linux VM disk image, not
a bind mount. Reach the files through the container: attach with VS Code Dev
Containers, `docker cp odyssey-workspace:/home/agent/okta/<path> .`, or commit and
push from inside. This isolation is deliberate — see the Linux-native-repos
decision record.

## Files

- `Dockerfile` — the `odyssey-implementer-agent` image: Node 24, Yarn 4,
  `gh` CLI, Claude Code, t3code (see Option D above), corporate CA trust, a
  non-root `agent` user, Playwright's Chromium for browser tests, an `ocm`
  shim (see "Carrying the managed policy into the container" above), the MCP
  header helpers under `/usr/local/lib/okta-mcp/`, `workspace-init.sh` (the
  container-side git-insteadOf/seed-clone/MCP-merge bring-up), and
  `workspace-refresh.sh` (the flag-gated in-place CLI upgrade; see "Self-upgrading
  agent CLIs" above).
- `pinned-versions.json` — source-of-truth version manifest read by
  `workspace-refresh.sh`.
- `dev-proxy.mjs` — the dev-app share proxy: published data plane that routes by
  Host header to a dev server on container loopback, plus a loopback-only control
  API. Zero dependencies. See "Sharing a dev server with your host browser" above.
- `devshare` — CLI over that control API (`devshare <port> [label]`, `list`, `rm`).
- `shot-server.mjs` — static server and auto-generated gallery for the container's
  screenshot directory.
- `shot` — captures a page to a file in that directory, using the clone's Playwright
  and the baked browser. Needed because the Playwright MCP returns screenshots
  inline and never writes them to disk.
- `devshots` — starts the gallery on demand, shares it, prints its URL.
- `build-image.sh` — builds the image, injecting the corporate CA cert.
- `launch-implementer.sh` — creates the worktree, derives host tokens, and
  runs the container.
- `implement.md` — the brief the agent reads before executing the plan.
- `docker-compose.yml` — the persistent `odyssey-workspace` service, built
  from the same `odyssey-implementer-agent` image.
- `launch-workspace.sh` — derives/refreshes host tokens, generates the git
  `insteadOf` include and the MCP server definitions into `.workspace-env/`,
  starts the host token-broker, and starts (or restarts) the workspace
  container (which serves t3code). `--stop` tears down both;
  `--refresh-auth` re-derives tokens in place; `--no-sign` brings the
  workspace up without commit signing, skipping the interactive GPG
  passphrase prompt (for headless/non-interactive launches).
- `ocm-broker.mjs` — the host token-broker daemon. Runs the real `ocm auth …`
  on the host for scoped-token requests the container drops into the
  `.workspace-env/broker` file-spool (see "Host token-broker" above).
