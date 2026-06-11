---
description: Use when one or more contribution packages need to be re-provisioned from the current `@okta/ui-stacks-component-libraries-odyssey-contributions` stack. Runs `yarn provision` for each affected package then verifies build, typecheck, and tests pass. Use only when explicitly invoked.
---

# /update-contribution-stack — Sync contribution packages to the latest stack

Re-provisions contribution packages so their files (api-extractor.json, tsconfig.production\*, vite/vitest configs), `package.json` scripts, and devDependencies match the current contributions stack at `packages/platform/odyssey-contributions-stack/`.

Execute the steps in order. Do not skip steps — finish each before moving to the next.

---

## Pre-flight: Exit plan mode if active

If a "Plan mode is active" system-reminder is present:

1. Write to the plan file: "No plan needed — /update-contribution-stack is an execution workflow. Approve to exit plan mode and start the skill."
2. Call `ExitPlanMode` immediately.
3. Once approved, continue from the top of this skill.

---

## Pre-flight: Identify target packages

Find every package in the repo with an `ok.yaml` referencing `@okta/ui-stacks-component-libraries-odyssey-contributions`. Use `Glob` for `**/ok.yaml` and `Grep` for the stack name. Exclude paths under `node_modules/`.

Show the list to the user. Ask: **"Provision all of these, or just a subset?"** Wait for their answer before continuing.

---

## Pre-flight: Build the stack package

`yarn provision` imports the stack's `dist/index.js`. If the stack hasn't been built since the last edit, the import is stale.

```bash
yarn workspace @okta/ui-stacks-component-libraries-odyssey-contributions build
```

If it fails, stop — nothing else can proceed.

---

## Step 1 — Run provision sequentially from the repo root

Provision packages **sequentially** — `yarn provision` always runs `yarn install` internally, and concurrent installs race on shared monorepo `node_modules` symlinks causing EEXIST failures. Do not use `--parallel` or `--jobs` for this step.

**If provisioning all packages**, use the root script (which runs sequentially):

```bash
yarn provision:contributions
```

**If provisioning a subset**, construct a `workspaces foreach` without `--parallel`:

```bash
yarn workspaces foreach --all --interlaced \
  --include=@okta/pkg-a \
  --include=@okta/pkg-b \
  run provision
```

> **`--all` is required** even when filtering with `--include` — Yarn requires at least one of `--all`, `--recursive`, `--since`, or `--worktree` or it will error with "Invalid option schema".

> **Path note:** Never use `cd <relative-path> && yarn provision` in Bash calls — the tool does not share shell state between calls, so relative paths silently fail if a prior call left the CWD somewhere unexpected. The `workspaces foreach` approach avoids this entirely.

If the command fails, surface the full error and stop.

---

## Step 2 — Verify: typecheck and test each provisioned package

`yarn provision` runs `yarn install` internally, which triggers the root workspace's post-install build script — so a successful provision already implies the Vite build passes. No need to run `build` again here.

Run typecheck and test in parallel across the successfully provisioned packages. Use two separate `workspaces foreach` commands (one per check), each scoped to the same `--include` set as Step 1. Send both as parallel Bash calls in a single message.

```bash
yarn workspaces foreach --all --parallel --interlaced --jobs unlimited \
  --include=@okta/pkg-a \
  --include=@okta/pkg-b \
  run typecheck
```

```bash
yarn workspaces foreach --all --parallel --interlaced --jobs unlimited \
  --include=@okta/pkg-a \
  --include=@okta/pkg-b \
  run test
```

If a package does not have one of these scripts, `workspaces foreach` will skip it — that is fine.

If typecheck or test failures occur, attempt to diagnose and fix them:

1. Read the failing file(s) and identify the root cause.
2. Draft a fix and **present it to the user for confirmation before applying it using the `AskUserQuestion` tool** — describe what you found and what you propose to change.
3. Once approved, apply the fix, then re-run the failed check for that package to confirm it passes.
4. If the fix is non-obvious or risky, stop and ask rather than guessing.

Surface the full error output and flag which package(s) are broken before proceeding to the summary.

---

## Step 3 — Summary

Show `git diff --stat` so the user can see exactly what changed. Then print one line per provisioned package:

| Package | Provision | Typecheck | Test |
| ------- | --------- | --------- | ---- |

Use ✅ / ❌ / ⏭️ (skipped — script not present) for each cell. List any failures and their errors. Do not commit or push.

---

## Reference

- Stack manifest (source of truth): `packages/platform/odyssey-contributions-stack/src/stack-manifest.json`
- Stack files copied during provision: `packages/platform/odyssey-contributions-stack/files/`
- In-sync reference package: `packages/contributions/example-components/`
