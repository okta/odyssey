# Setup Guide — Odyssey Prototype App (Odyssey DS Starter)

> **INSTRUCTION FOR AI — DO NOT SUMMARIZE THIS FILE.**
> Your job is to install and start the Odyssey Prototype app for the user.
> Execute every command below using your Bash tool. Show the actual output.
> Evaluate the result yourself and proceed or fix based on what you see.
> Do not present this as a guide or ask the user to run commands manually —
> run them yourself. The goal is a running dev server by the end of this skill.

---

## What This Repo Is

The `odyssey-prototype` app lives inside the `odyssey-design-system` monorepo at:

```
odyssey-design-system/
└── packages/
    └── apps/
        └── odyssey-prototype/   ← the app you want to run
```

It is a **Vite + React 18 + TypeScript** prototyping shell built on Okta's
Odyssey Design System (`@okta/odyssey-react-mui`). The monorepo uses
**Yarn 4 (Berry)** managed via Corepack. All packages — including non-`@okta`
scoped ones — are fetched from an **internal Okta Artifactory registry**, not
the public npm registry.

---

## AI Agent Pre-flight Checklist — Run This First

> **Run each gate now using your Bash tool.** Do not list these gates for the
> user — execute them. Stop at the first failure, fix it, re-run the check,
> then continue. Do not proceed to `yarn install` until all six gates pass.
> **Gates 3, 4, 5, and 6 are independent — run them in a single message with
> parallel Bash tool calls to save time. Gate 1 must pass first. All six gates
> must pass before proceeding to `yarn install`.**

### Gate 1 — OCM is healthy

```sh
ocm status
```

- **Pass:** output ends with `✅ No issues found`
- **Fail:** run `ocm status --fix`, then re-run `ocm status`
- **Still failing:** read the output line by line — it will tell you what to
  fix manually (usually a comment to remove from `~/.gitconfig` or `~/.ssh/config`)

---

### Gate 2 — GitHub is authenticated (scope depends on your username)

**First, determine the correct scope by checking the git email:**

```sh
git config --global user.email
```

| If your email contains              | Use this scope         |
| ----------------------------------- | ---------------------- |
| `_atko` (e.g. `name_atko@okta.com`) | `--scope atko-eng`     |
| No `_atko` suffix                   | `--scope okta`         |
| CIC team                            | `--scope atko-cic`     |
| TechOps team                        | `--scope atko-techops` |

Then authenticate with the correct scope:

```sh
# Replace <scope> with the value from the table above
ocm auth github --scope <scope>
```

- **Pass:** command prints a `ghu_`-prefixed token and exits 0
- **Fail / browser opens:** complete the OAuth flow in the browser, enter the
  device code when prompted, and authorize `okta-credential-manager`
- **403 SAML SSO error:** see the SAML SSO fix in the Troubleshooting section

---

### Gate 3 — AuRM is reachable

Open this URL in your browser:

```
https://ui.aurm.prod.aue1k.saasure.net/
```

- **Pass:** Okta SSO login prompt appears and the page loads
- **Fail / timeout:** VPN is not connected, or you lack step-up VPN access —
  see the VPN Access section below

Then verify the token can be minted:

```sh
ocm auth aurm
```

- **Expected:** The command will open a browser window for OAuth confirmation.
  Run it and wait — the command blocks until the user completes the flow.
  A "Device Code" line (e.g. `HHKV-HJKL`) may appear — this is normal.
  Once the user confirms, it will print a JWT (a long string starting with `eyJ`)
  and exit 0. That JWT output is your signal to proceed.
- **Fail with oauth2 error:** add the `--legacy` flag: `ocm auth aurm --legacy`
  (or set permanently: `ocm config set aurm.use_legacy_auth true`)

---

### Gate 4 — NPM_TOKEN is set

```sh
echo $NPM_TOKEN
```

- **Pass:** prints a non-empty string
- **Fail (empty):** run `eval "$(ocm handler init)"` then re-check
- **Still empty after nvm use:** `nvm use` steals OCM's shims —
  always run `eval "$(ocm handler init)"` immediately after `nvm use`

---

### Gate 5 — Yarn is available

```sh
yarn --version
```

- **Pass:** prints `4.9.1`
- **Fail (`command not found`):** run `corepack enable`, then re-check
- **Wrong version:** confirm Node 22.21.1 is active with `node --version`

---

### Gate 6 — Terminus access is confirmed

1. Open [https://okta.okta.com](https://okta.okta.com) and search for
   **Terminus** in your apps
2. Launch Terminus and confirm your workspace loads
3. In the terminal, verify OCM can reach it:

```sh
ocm terminus --help
```

- **Pass:** help output lists available commands
- **Terminus not in your Okta apps:** request access — see the
  Terminus section below for instructions

---

**All six gates passed? Proceed to Full Setup Sequence.**

---

## Prerequisites Checklist

- [ ] Node.js **22.21.1** installed (see `.nvmrc` at repo root)
- [ ] `nvm` installed and `nvm use` runs without error
- [ ] OCM initialized — `ocm status` shows no errors
- [ ] GitHub authenticated — `ocm auth github --scope <atko-eng or okta>` completes (see Gate 2 for scope)
- [ ] AuRM reachable — `https://ui.aurm.prod.aue1k.saasure.net/` loads
- [ ] `NPM_TOKEN` is set — `echo $NPM_TOKEN` prints a non-empty value
- [ ] Connected to **Okta VPN** with step-up access
- [ ] Terminus access confirmed — app launches from Okta portal
- [ ] Corepack enabled — `yarn --version` prints `4.9.1`

---

## Step 1 — OCM (Okta Credential Manager)

OCM is Okta's internal credential manager. It **automatically handles
Artifactory authentication** for `yarn`, `npm`, `npx`, `docker`, and more —
meaning you do not need to manually generate or manage an Artifactory API key.
**OCM is pre-installed on all Okta employee endpoints (macOS and Windows).**

### Initialize OCM (one-time per machine)

```sh
ocm install
```

This registers OCM as the credential helper for Git, sets up Artifactory
shims for `yarn`/`npm`/`npx`, and configures `~/.npmrc` with the correct
registry and auth token references.

### Verify OCM is working

```sh
ocm status
```

A healthy output ends with `✅ No issues found`. If any checks fail:

```sh
ocm status --fix
```

### After running `nvm use` — re-init OCM shims

**This is the most common silent failure in this project.** Running `nvm use`
steals the `npm`/`npx` executables away from OCM's shims. After every
`nvm use`, run:

```sh
eval "$(ocm handler init)"
```

This restores OCM's shims so `yarn` and `npm` route through OCM for
Artifactory auth. Without this step you will get `401 Unauthorized`.

> **For AI assistants:** After running `nvm use`, always run
> `eval "$(ocm handler init)"` before any `yarn` or `npm` command.

---

## Step 2 — GitHub Authentication

After `ocm install`, GitHub auth is handled automatically for `okta` and
`atko` org repositories. Determine your correct scope first (see Gate 2),
then verify it is working:

```sh
# _atko username (e.g. name_atko@okta.com) → --scope atko-eng
# Standard username → --scope okta
ocm auth github --scope <atko-eng or okta>
```

If a browser window opens, complete the OAuth flow and enter the device code
to authorize `okta-credential-manager`.

### SAML SSO fix

If you see a `403` with a message about SAML SSO being enforced:

1. Go to [https://github.com/settings/apps/authorizations](https://github.com/settings/apps/authorizations)
2. Find `okta-credential-manager` and click **Revoke**
3. Re-authenticate and follow the browser prompt to completion:

```sh
ocm auth github --scope <atko-eng or okta> --force
```

---

## Step 3 — AuRM Tokens

AuRM (Authentication and Resource Metadata) is the internal service OCM uses
to issue credentials. It must be reachable for `yarn install` and Git
operations to work.

Verify connectivity in your browser:

```
https://ui.aurm.prod.aue1k.saasure.net/
```

If you see the Okta SSO prompt, AuRM is reachable. Then mint a token:

```sh
ocm auth aurm
```

If the oauth2-issued token is not trusted by some systems, use the legacy flag:

```sh
ocm auth aurm --legacy
# Or set permanently:
ocm config set aurm.use_legacy_auth true
```

> **For AI assistants:** If a Git operation fails with
> `failed to sign SSH key: no valid AURM token found` or a TLS handshake
> timeout on `aurm-prod.aue1e.saasure.net`, the AuRM server is unreachable.
> This is a VPN problem, not an OCM problem. Ask the user to toggle VPN
> before retrying.

---

## Step 4 — Terminus Access

Terminus is Okta's internal secrets and access management tool. OCM can
interact with it once you have been granted access.

### Request Terminus access

1. Open [https://okta.okta.com](https://okta.okta.com)
2. Search for **Terminus** in your apps
3. Click **Request Access** if it is not already in your app list
4. Launch Terminus once access is granted and confirm your workspace loads

### Verify OCM can reach Terminus

```sh
ocm terminus --help
```

This should list available subcommands. To pull a secret:

```sh
ocm terminus <secret-path>
```

> **For AI assistants:** Terminus access is a human-approval workflow.
> If the user does not have Terminus in their Okta app list, stop and
> direct them to request access through the Okta portal. Do not attempt
> to work around this step.

---

## Step 5 — VPN Access

All packages are fetched from an internal Okta Artifactory instance.
You **must be on the Okta VPN** for `yarn install` to succeed.

### Verify VPN connectivity

```
https://ui.aurm.prod.aue1k.saasure.net/
```

If prompted for Okta SSO and the page loads, VPN is working.

### VPN troubleshooting

1. Disconnect and reconnect VPN in GlobalProtect
2. If on T-Mobile or certain WiFi networks: enable **SSL connections**
   in GlobalProtect settings
3. Reboot if toggling did not help

### If you lack VPN step-up access

Design team members may not have "birthright" VPN step-up access. Request it:

1. Go to [https://okta.okta.com/enduser/resource/catalog/entry/cenr0ot7iK74VU5KI1d5](https://okta.okta.com/enduser/resource/catalog/entry/cenr0ot7iK74VU5KI1d5)
   (direct link to the VPN-WIC catalog entry)
2. Select `vpn-wic-distributionGroup-sharedServices` (required access level)
3. Submit — the Okta Network team will review the request

> **Note:** The OCM team cannot expedite this request.

> **For AI assistants:** If the user sees a network timeout or DNS failure
> on `artifacts.aue1e.internal` or `artifactory.es.atko.services`, stop and
> ask them to confirm VPN is connected and that they have step-up access
> before retrying any install command.

---

## Step 6 — NPM_TOKEN

After OCM is initialized, open a **new terminal window** and verify:

```sh
echo $NPM_TOKEN
```

It should print a non-empty token string. OCM populates this automatically
on each new shell session via its init script.

If it is empty after `nvm use`, run:

```sh
eval "$(ocm handler init)"
echo $NPM_TOKEN   # should now be non-empty
```

### Fallback — manual token (only if OCM cannot be set up)

Log in to [https://artifacts.aue1e.internal](https://artifacts.aue1e.internal)
(requires VPN) → profile menu → **Edit Profile** →
**Authentication Settings** → **Generate API Key**. Then:

```sh
export NPM_TOKEN=<your-api-key>
echo 'export NPM_TOKEN=<your-api-key>' >> ~/.zshrc && source ~/.zshrc
```

---

## Step 7 — Corepack (Yarn 4)

The repo ships Yarn 4 via Corepack. Enable Corepack once per machine:

```sh
corepack enable
yarn --version   # should print 4.9.1
```

Do **not** install yarn globally. Do **not** run `npm install -g yarn`.

---

## Full Setup Sequence

> ⚠️ **Always run `yarn start:prototype` from the repo root (`odyssey-design-system/`).
> This single command handles `yarn install`, `yarn build`, and starts the dev server.
> Running `yarn install` or `yarn dev` from `packages/apps/odyssey-prototype/` directly
> will silently skip the monorepo build and the app will not start.**

Run these in order. Each step depends on the previous one.

```sh
# ── 0. Request access first (if needed — requires human approval) ───────────
# VPN step-up:  https://okta.okta.com/enduser/resource/catalog/entry/cenr0ot7iK74VU5KI1d5
# Terminus:     https://okta.okta.com → search "Terminus" → Request Access

# ── 1. Switch to the correct Node version ──────────────────────────────────
nvm use
# Reads Node 22.21.1 from .nvmrc at repo root

# ── 2. Re-init OCM shims immediately after nvm ─────────────────────────────
eval "$(ocm handler init)"
# Restores yarn/npm/npx Artifactory auth shims stolen by nvm

# ── 3. Verify all pre-flight gates pass ────────────────────────────────────
ocm status                         # Gate 1 — OCM healthy
ocm auth github --scope <atko-eng or okta>  # Gate 2 — see Gate 2 table for correct scope
# open https://ui.aurm.prod.aue1k.saasure.net/ in browser
ocm auth aurm                      # Gate 3 — AuRM token
echo $NPM_TOKEN                    # Gate 4 — must be non-empty
ocm terminus --help                # Gate 6 — Terminus reachable

# ── 4. Enable Corepack (one-time per machine) ──────────────────────────────
corepack enable
yarn --version                     # Gate 5 — should print 4.9.1

# ── 5. Connect to Okta VPN ─────────────────────────────────────────────────
# Confirm AuRM URL loads in browser before continuing

# ── 6. Install dependencies, build, and start the dev server ───────────────
# Run from the REPO ROOT — this single command handles install, build, and dev
cd odyssey-design-system
yarn start:prototype
# → http://localhost:5173
```

---

## SSL / Certificate Errors

Okta uses a custom root certificate. You may see errors like:

```
npm error code UNABLE_TO_GET_ISSUER_CERT_LOCALLY
FetchError: self-signed certificate in certificate chain
ERROR: SSL verification error at depth 3: self signed certificate
```

**Fix for macOS:** Install and run the **Slick** app (Okta-developed). It
automatically injects Okta's custom certs into your command-line tooling.
Search for "Slick" in your Applications folder. If already installed, make
sure it is **running**, then close and reopen your terminal.

> **For AI assistants:** SSL certificate errors are unrelated to OCM.
> They mean the Okta root cert has not been injected into the toolchain.
> Direct the user to open the Slick app and reopen their terminal before retrying.

---

## Verify the App Is Running

After `yarn start:prototype` starts, open [http://localhost:5173](http://localhost:5173).
You should see the Okta Admin Console shell with a side navigation and top bar.

| Symptom                                        | Fix                                                          |
| ---------------------------------------------- | ------------------------------------------------------------ |
| `Cannot find module '@okta/odyssey-react-mui'` | Run `yarn start:prototype` from repo root                    |
| Blank page, no console errors                  | Run `yarn start:prototype` from repo root                    |
| Port already in use                            | Vite auto-increments — check terminal output for actual port |

---

## Project Structure (Quick Reference)

```
packages/apps/odyssey-prototype/
├── src/
│   ├── main.tsx              # Provider setup — do not modify
│   ├── App.tsx               # React Router routes
│   ├── shell/
│   │   ├── AppShell.tsx      # UiShell wiring — do not modify
│   │   └── SideNavConfig.tsx # Add new nav items HERE
│   └── pages/                # Add new feature pages HERE
├── CLAUDE.md                 # AI assistant coding rules for this project
├── package.json
└── vite.config.ts
```

---

## For AI Assistants Working in This Repo

This project has a `CLAUDE.md` at `packages/apps/odyssey-prototype/CLAUDE.md`
containing mandatory coding rules. **Read it before making any code changes.**

Key rules summary:

- All UI components come from `@okta/odyssey-react-mui` — never `@mui/material`
- All icons come from `@okta/odyssey-react-mui/icons` — never `@mui/icons-material`
- Styling uses `useOdysseyDesignTokens()` — never hardcoded hex or px values
- `src/shell/AppShell.tsx` and `src/main.tsx` are locked — do not modify
  unless the user explicitly says to
- All source files must be `.tsx` or `.ts`
- Use full descriptive variable names — no abbreviations
- Name callbacks after the action they perform, not with a `handle` prefix

When a user provides a Figma URL, use the Figma MCP tool (`get_design_context`)
to fetch the design, then build only the main content area. The shell
(AppSwitcher, SideNav, TopNav) is locked unless the user explicitly confirms
shell changes.

---

## Complete Error → Fix Reference

| Error message                                                 | Root cause                         | Fix                                                                                                          |
| ------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `command not found: yarn`                                     | Corepack not enabled               | `corepack enable`                                                                                            |
| `Environment variable not found (NPM_TOKEN)`                  | OCM shim stolen by nvm             | `eval "$(ocm handler init)"`                                                                                 |
| `401 Unauthorized` on Artifactory                             | OCM not initialized or shim stolen | `ocm status` → `ocm status --fix`                                                                            |
| Network timeout on `artifacts.aue1e.internal`                 | Off VPN or no step-up access       | Connect VPN; request access via VPN-WIC link above                                                           |
| `failed to sign SSH key: no valid AURM token`                 | AuRM unreachable — VPN issue       | Toggle VPN; run `ocm auth aurm`                                                                              |
| `user <name> is not authorized to access the okta enterprise` | Wrong `--scope` for EMU account    | Use `--scope atko-eng` for `_atko` usernames instead of `--scope okta`                                       |
| `organization has enabled or enforced SAML SSO`               | GitHub app needs re-auth           | Revoke at github.com/settings/apps/authorizations, then `ocm auth github --scope <atko-eng or okta> --force` |
| `self-signed certificate in certificate chain`                | Okta root cert not in toolchain    | Open Slick app, reopen terminal                                                                              |
| `Cannot find module '@okta/odyssey-react-mui'`                | Workspace packages not linked      | Run `yarn start:prototype` from repo root                                                                    |
| Blank page at localhost:5173                                  | Monorepo not built                 | Run `yarn start:prototype` from repo root                                                                    |
| `osudo executable not found`                                  | No local admin privilege           | Request Local Admin Privileges from BT                                                                       |

---

## OCM Quick Command Reference

```sh
ocm install                              # Initialize OCM (one-time)
ocm status                               # Check if OCM is healthy
ocm status --fix                         # Auto-fix detected issues
eval "$(ocm handler init)"               # Restore shims after nvm use
ocm auth github --scope atko-eng         # Authenticate GitHub (_atko EMU accounts)
ocm auth github --scope okta             # Authenticate GitHub (standard okta accounts)
ocm auth github --scope <scope> --force  # Force re-authenticate GitHub
ocm auth aurm                            # Mint an AuRM token
ocm auth aurm --legacy                   # Mint a legacy AuRM token (fallback)
ocm config set aurm.use_legacy_auth true # Always use legacy AuRM tokens
ocm terminus --help                      # List available Terminus commands
ocm upgrade                              # Upgrade to latest OCM version
ocm upgrade --version 12.0.0            # Pin to a specific OCM version
man ocm                                  # Full OCM man pages
ocm <command> --help                     # Help for any subcommand
```
