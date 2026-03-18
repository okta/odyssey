# fix-registry — Diagnose and Fix Artifactory Auth Failures

Use this skill when `yarn install` fails with any of these errors:

```
YN0041: Invalid authentication (as an anonymous user)
401 Unauthorized
Environment variable not found (NPM_TOKEN)
Network timeout on artifacts.aue1e.internal
```

---

## Step 1 — Check NPM_TOKEN

```sh
echo $NPM_TOKEN
```

- **Non-empty output → skip to Step 3**
- **Empty output → continue to Step 2**

---

## Step 2 — Restore OCM shims

`nvm use` steals OCM's auth shims. Re-init them:

```sh
eval "$(ocm handler init)"
echo $NPM_TOKEN   # must now be non-empty
```

If still empty, OCM may not be initialized on this machine. Run the full
pre-flight checklist:

```sh
ocm status
ocm status --fix   # if any checks fail
```

If OCM is not installed at all, follow `/setup` from the beginning.

---

## Step 3 — Check VPN

Open this URL in a browser:

```
https://ui.aurm.prod.aue1k.saasure.net/
```

- **Loads → VPN OK, continue to Step 4**
- **Timeout / DNS failure → VPN is not connected**

Connect Okta VPN via GlobalProtect and retry. If the connection succeeds but
`artifacts.aue1e.internal` still times out, the user may lack VPN step-up
access — direct them to request it:

```
https://okta.okta.com/enduser/resource/catalog/entry/cenr0ot7iK74VU5KI1d5
```

---

## Step 4 — Check global Yarn registry auth

The project's `.yarnrc.yml` only configures auth for `@okta` scoped packages.
If OCM is healthy but `yarn install` still fails for non-`@okta` packages
(e.g. `abbrev`, `acorn`, `yaml`), the global registry is missing auth.

Check whether a global yarnrc exists:

```sh
cat ~/.yarnrc.yml
```

If the file does not exist or does not include auth for the Okta registry,
create it:

```sh
cat > ~/.yarnrc.yml << 'EOF'
npmRegistries:
  "https://artifacts.aue1e.internal/artifactory/api/npm/npm-okta-master":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
  "https://artifacts.aue1e.internal:443/artifactory/api/npm/npm-okta-master":
    npmAlwaysAuth: true
    npmAuthToken: "${NPM_TOKEN}"
EOF
```

> **Note:** This file is global (in your home directory) and not part of the
> project. It will not be committed. It complements — and does not replace —
> the project's `.yarnrc.yml`.

Then retry:

```sh
yarn install
```

---

## Step 5 — SSL certificate errors

If you see:

```
self-signed certificate in certificate chain
UNABLE_TO_GET_ISSUER_CERT_LOCALLY
```

This is not an auth problem — it means Okta's root certificate is not injected
into the toolchain. Fix:

1. Open the **Slick** app (search in Applications)
2. Close and reopen the terminal
3. Retry `yarn install`

---

## Quick Reference

| Symptom                                   | Fix                               |
| ----------------------------------------- | --------------------------------- |
| `NPM_TOKEN` empty                         | `eval "$(ocm handler init)"`      |
| `401 Unauthorized`                        | `ocm status` → `ocm status --fix` |
| Non-`@okta` packages fail auth            | Create `~/.yarnrc.yml` (Step 4)   |
| DNS timeout on `artifacts.aue1e.internal` | Connect VPN                       |
| SSL cert error                            | Open Slick app, reopen terminal   |
