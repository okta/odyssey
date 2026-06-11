---
description: Use when the user has uncommitted changes ready to ship and wants to create a Jira ticket, create a master-based worktree/branch, commit, push, and open a PR targeting master in one flow. Use only when explicitly invoked — never auto-trigger.
---

# /shipit — Jira + worktree + commit + push + PR workflow (defaults to master)

End-to-end workflow for shipping a small fix or task to `master`. Starting from uncommitted local changes, it creates a linked Jira ticket, makes a fresh worktree off `master`, moves your uncommitted changes into it, commits, runs the master-bound pre-push gate, opens a PR back to `master`, and leaves your local checkout untouched.

**Defaults (override via flags or free-text below):**

- Branches off `master` in a fresh worktree under `.claude/worktrees/<branch-name>/`. Your current checkout, branch, and Storybook process are not touched.
- The PR always targets `master`, regardless of which branch you happened to be on when you invoked `/shipit`.
- For visual changes, offers a unique-port dev server in the worktree (default Storybook port stays free for your local Storybook).
- Before pushing, runs `yarn lint`, `yarn typecheck`, and `yarn test` from the worktree (the master-targeting pre-push gate from AGENTS.md §4). If any fails, stops without pushing.
- The PR body uses `.github/PULL_REQUEST_TEMPLATE.md` verbatim, filling only the Jira link and Summary.

**Prerequisites:**

- Uncommitted changes already in place (or pass `--branch <existing>` to skip change movement)
- `gh` CLI authenticated (`gh auth status`)
- Jira ord-skill installed (`~/.claude/plugins/cache/ord-claude-plugins/ord-skills/`)

**Produces:**

- A Jira ticket (Task or Bug) assigned to the UICore Odyssey component
- A fresh worktree at `.claude/worktrees/<initials>-<slug>-<OKTA-XXXXX>/` branched off `master`
- A single conventional commit
- A pull request with `--base master`, Jira link and Summary pre-filled

**Optional flags** (parse from `$ARGUMENTS` before starting):

- `--jira <KEY>` — skip Steps 3–6 (Jira ticket creation, transitions, priority, size, sprint, epic) and use this existing ticket key throughout.
- `--branch <name>` — skip Step 8 (worktree creation) and check out this existing branch in place instead.

**Free-text overrides** (also parsed from `$ARGUMENTS`):

- **Pasted Jira link or key** — anything matching `OKTA-\d+` (e.g. `https://oktainc.atlassian.net/browse/OKTA-1234567` or a bare `OKTA-1234567`) is treated as `--jira OKTA-1234567`. Skip Steps 3–6.
- **"don't use a worktree" / "use the current branch"** (or close paraphrase) — skip the worktree path (Step 8a) and use the in-place fallback (Step 8b) on the current branch.

Both flags and free-text overrides are independent; any combination is allowed.

Execute the following steps in order. Do not skip steps or batch them — complete each one before moving to the next.

---

## Step 1: Get user initials

Check memory for a saved `user_initials` value.

- If found: use it silently
- If not found: ask the user for their initials (e.g. "rj"), save to memory as a `user` type entry, and use that value for the rest of this session

---

## Step 2: Analyze current changes

Run `git diff HEAD` and `git status --short` to understand what has changed.

Based on the diff, generate:

- **slug**: short, hyphen-separated, branch-friendly (e.g. `fix-autocomplete-stories`)
- **summary**: explicit one-line Jira task title — name the specific thing that changed, not a vague description (e.g. "Fix Autocomplete stories to document missing props", not "Fix stories")
- **description**: one sentence that expands on the summary

Present slug, summary, and description to the user and ask them to confirm or correct before continuing.

Also classify the change as **visual** or **non-visual** (used in Step 9.5):

- Visual = any modification under `packages/apps/odyssey-storybook/`, `packages/core/odyssey-react-mui/`, `packages/contributions/odyssey-blueprint/`, or any `*.stories.tsx` / Storybook MDX file.
- Non-visual = everything else (docs, build config, scripts, tests-only).

---

## Step 3: Gather Jira task details

**If `--jira <KEY>` was provided (or a Jira link/key was pasted in `$ARGUMENTS`):** skip Steps 3 through 6 entirely. Use the provided key as the ticket key for all subsequent steps.

---

Use AskUserQuestion to collect the following. Ask all at once if possible:

1. **Issue type** — Task or Bug
2. **Priority** — `P1` (blocking a team or high-priority for our team), `P2` (typical default), or `P3` (fix-it / tooling tweak). We do not use P0 or P4.
3. **T-shirt size** (Story Points) — `XS`=1, `S`=2, `M`=3, `L`=5, `XL`=8. Doc/tooling-only changes are usually `XS`.

Issue type, priority, and size are all required.

### If issue type is Bug, ask two additional questions:

4. **Steps to reproduce (Bug Q2)** — free text describing the scenario or steps to reproduce the issue
5. **Regression (Bug Q5)** — select one:
   - `Yes (functionality used to work in Preview/Prod)`
   - `No (functionality never worked in Preview/Prod)`

Both bug fields are required when issue type is Bug.

---

## Step 4: Login to Jira

Find the jira skill directory dynamically (version-agnostic):

```bash
JIRA_SKILL=$(ls -d ~/.claude/plugins/cache/ord-claude-plugins/ord-skills/*/skills/jira 2>/dev/null | sort -V | tail -1)
```

Run `$JIRA_SKILL/scripts/read/login_jira.sh`.
If it fails, retry with `--force`. If it still fails, stop and tell the user.

---

## Step 5: Create the Jira task

Static fields — always use these unless the user overrides:

- **Project**: OKTA
- **Component**: Team: UICore Odyssey

**For Task:**

```bash
$JIRA_SKILL/scripts/write/create_jira.sh \
  --summary "<confirmed summary>" \
  --description "<confirmed description>" \
  --component "Team: UICore Odyssey" \
  --issuetype "Task"
```

**For Bug** — write steps to reproduce to a temp file to avoid shell escaping issues:

```bash
cat > /tmp/shipit_steps.txt << 'EOF'
<steps to reproduce>
EOF

$JIRA_SKILL/scripts/write/create_jira.sh \
  --summary "<confirmed summary>" \
  --description "<confirmed description>" \
  --component "Team: UICore Odyssey" \
  --issuetype "Bug" \
  --is-regression "<yes|no>" \
  --steps-to-reproduce-file /tmp/shipit_steps.txt
```

Map Bug Q5 to the `--is-regression` flag as follows:

- "Yes (functionality used to work in Preview/Prod)" → `yes`
- "No (functionality never worked in Preview/Prod)" → `no`

Capture the returned ticket key (e.g. `OKTA-1151880`).

### Step 5a: Assign to self

```bash
$JIRA_SKILL/scripts/write/assign_jira.sh <key> --me
```

### Step 5b: Transition to Triaged

New tickets start in Open. Move to Triaged using the "Accept Priority" transition:

```bash
$JIRA_SKILL/scripts/write/transition_jira.sh <key> --transition "Accept Priority"
```

If this fails, run `--list` to discover available transitions from Open and pick the one that moves to Triaged:

```bash
$JIRA_SKILL/scripts/write/transition_jira.sh <key> --list
```

### Step 5c: Transition to In Progress

From Triaged, move to In Progress. The transition name from Triaged is **"Start Progress"** (not "In Progress" — that fails):

```bash
$JIRA_SKILL/scripts/write/transition_jira.sh <key> --transition "Start Progress"
```

If this fails, run `--list` to discover the correct transition name from Triaged and use that instead.

---

## Step 6: Set priority, size, sprint, and epic

All four fields are required (per Odyssey triage process). Set in this order:

### Step 6a: Priority (P1, P2, or P3)

```bash
$JIRA_SKILL/scripts/write/edit_jira.sh <key> --field Priority --value <P1|P2|P3>
```

### Step 6b: Story Points (t-shirt size)

```bash
$JIRA_SKILL/scripts/write/edit_jira.sh <key> --field "Story Points" --value <1|2|3|5|8>
```

(`XS`=1, `S`=2, `M`=3, `L`=5, `XL`=8.)

### Step 6c: Active Odyssey sprint

The Sprint field (`customfield_10121`) and the parent epic (Jira treats epics as parents in this project) **are** listed by `edit_jira.sh --list-fields`, but `edit_jira.sh --field Sprint --value <id>` mis-shapes the payload as `{"customfield_10121":["<id>"]}` (array of strings) when Jira expects a bare number, and `--field parent --value <KEY>` sends `{"parent":"<KEY>\n"}` instead of `{"parent":{"key":"<KEY>"}}`. Both silently no-op on the server. Always use the direct API call below — confirmed via `--dry-run` against a real ticket on 2026-06-05.

First, look up the active sprint id:

```bash
$JIRA_SKILL/scripts/read/search_jira_jql.sh \
  'project = OKTA AND component = "Team: UICore Odyssey" AND sprint in openSprints()' \
  | head -1
# Then read any returned ticket's customfield_10121 to find the active sprint's id and name:
$JIRA_SKILL/scripts/read/get_jira_full.sh <any-ticket-from-above> \
  | python3 -c "import sys,json; d=json.load(sys.stdin); \
    [print(s['id'], s['name']) for s in d['fields']['customfield_10121'] if s['state']=='active']"
```

Then set the sprint via the underlying Jira REST API (the script's `--value` mode wraps strings, but Sprint expects a bare number):

```bash
SCOPES="read:jira-work,write:jira-work,read:jira-user"
AUTH_TOKEN=$(ocm auth atlassian --product jira --scopes $SCOPES)
JIRA_BASE="https://api.atlassian.com/ex/jira/baeddaca-1555-4392-972a-d132ec1a7279"

curl -s -X PUT "${JIRA_BASE}/rest/api/2/issue/<key>" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"fields":{"customfield_10121":<sprint-id>}}'
```

### Step 6d: Parent epic

Pick the epic by topic. Look up the exact epic by searching open epics on the team component:

```bash
$JIRA_SKILL/scripts/read/search_jira_jql.sh \
  'project = OKTA AND issuetype = Epic AND component = "Team: UICore Odyssey" AND statusCategory != Done'
```

Common matches:

- **AI / Claude / slash commands / agent tooling** → `OKTA-1175959` ("ORD AI - Odyssey and UI AI Tooling Enablment")
- **MCP work** → `OKTA-1194867` ("Odyssey MCP")
- **Most bug fixes / general core work** → search the list above for "Odyssey Core" / similar; verify the exact key before setting.

Set the parent via the same direct API call (the convenience script rejects "Epic Link" / "parent" for this project):

```bash
curl -s -X PUT "${JIRA_BASE}/rest/api/2/issue/<key>" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"fields":{"parent":{"key":"<EPIC-KEY>"}}}'
```

You can combine 6c and 6d into a single `PUT` if you have both ids ready: `{"fields":{"customfield_10121":<id>,"parent":{"key":"<EPIC>"}}}`.

---

## Step 8: Create the branch

Compute the branch name as `<initials>-<slug>-<ticket-key>` (e.g. `rj-fix-autocomplete-stories-OKTA-1151880`).

Then choose **Step 8a** (default — worktree off master) or **Step 8b** (in-place fallback). Use 8b only if `--branch <name>` was provided, OR the user said "don't use a worktree" / "use the current branch" in `$ARGUMENTS`.

### Step 8a: Default — fresh worktree off `master`

This leaves the user's local checkout, branch, and any running dev servers untouched.

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
WORKTREE_PATH="$REPO_ROOT/.claude/worktrees/<branch-name>"

# Create the worktree on a new branch off master FIRST (works whether the user's
# checkout is dirty or clean — `git worktree add` doesn't touch the source tree).
git -C "$REPO_ROOT" fetch origin master
git -C "$REPO_ROOT" worktree add -b <branch-name> "$WORKTREE_PATH" origin/master

# Symlink root node_modules so yarn / lint-staged / pre-commit hooks work in the worktree
# (per AGENTS.md §8 "Worktree setup for workers")
ln -s "$REPO_ROOT/node_modules" "$WORKTREE_PATH/node_modules"

# Move the user's uncommitted changes into the worktree only if they have any.
# `stash push -u` includes untracked files; `stash apply` (run from the worktree)
# restores BOTH tracked and untracked. `stash show -p | git apply` would silently
# drop untracked files, so don't use it.
if [ -n "$(git -C "$REPO_ROOT" status --porcelain)" ]; then
  git -C "$REPO_ROOT" stash push -u -m "shipit:<ticket-key>"
  git -C "$WORKTREE_PATH" stash apply  # restores tracked + untracked
  git -C "$REPO_ROOT" stash drop       # the stash is now applied in the worktree
fi

# All subsequent steps run from the worktree
cd "$WORKTREE_PATH"
```

If `git stash apply` reports a conflict inside the worktree (the stash didn't apply cleanly off master), stop and tell the user — they likely have changes that depend on un-merged work on their branch and need to ship from the in-place flow (`--branch <existing>` or "use the current branch" override) instead. The original stash is still on the user's stash list (only `drop` runs after a clean apply), so nothing is lost.

### Step 8b: Fallback — in place on the current branch

Used when `--branch <name>` was provided or the user opted out of worktrees in free text.

If `--branch <name>` was provided:

```bash
git checkout <name>
```

Otherwise (user wants to branch off the current branch in place):

```bash
git stash
git checkout -b <branch-name>
git stash pop
```

The PR will still target `master` (Step 11) unless the user also passes `--branch` against an existing topic branch with its own parent. If you started on a worker branch other than master and the override is in effect, ask whether to PR to `master` or to the worker branch's parent before continuing.

---

## Step 9: Stage and commit

(In the worktree if Step 8a, or the current checkout if Step 8b.)

Check `git status --short`. Stage all modified tracked files:

```bash
git add -u
```

If there are untracked files, list them and ask the user whether to include any.

Determine the Conventional Commits type from the change:

- `fix:` — corrections, bug fixes, missing/wrong documentation
- `feat:` — new functionality
- `docs:` — documentation-only changes
- `refactor:`, `test:`, `style:`, `perf:`, `build:` — as appropriate
- **Never use `chore:`** — Bacon CI will reject it

Commit rules for this repo:

- Subject line must be **under 50 characters**
- First letter after `:` must be **lowercase**
- No trailing period

```bash
git commit -m "<type>: <short description>"
```

---

## Step 9.5: Visual review on a unique port (visual changes only)

Skip this step entirely if Step 2 classified the change as non-visual.

For visual changes, launch the relevant dev server from inside the worktree on a non-default port so it does not collide with the user's local Storybook on `:6006` or app dev server on `:5173`.

- Storybook changes: `yarn workspace @okta/odyssey-storybook start --port 6107`
- Other Vite app changes: pick `5174` (or higher) and pass via the package's `--port` flag.

Tell the user the URL. If Playwright MCP is available, navigate there and take a screenshot of the affected story or page so they can confirm visually before approving. Once the user approves, kill the dev server process before continuing.

If Playwright MCP isn't available, just print the URL and wait for the user to confirm.

---

## Step 9.75: Pre-PR validation gate

From the worktree root (or the current checkout in the 8b path), run the master-targeting pre-push gate from AGENTS.md §4:

```bash
yarn typecheck
yarn lint
yarn test
```

If any of these fail, **stop and surface the failure to the user — do not push**. The user cannot merge a broken PR; CI cycles are wasted on a known failure.

If `yarn typecheck` reports failures that look like stale `@okta/...` types, you're hitting the worktree symlink gotcha (see AGENTS.md §4 → "Pre-push gate for `master`-targeting PRs" → the "Worktree gotcha when running `yarn typecheck`" paragraph). Because `<worktree>/node_modules` symlinks to `<main>/node_modules`, `@okta/...` imports resolve to the main checkout's stale `dist/types/` and hide a real type error. Rebuild the worktree's package types and re-run typecheck before deciding it's a real failure:

```bash
yarn tsc --project packages/<path-of-edited-package>/tsconfig.production.json
yarn typecheck
```

---

## Step 10: Push

```bash
git push -u origin <branch-name>
```

---

## Step 11: Create the pull request

Use `gh pr create` with `--base master` (the whole point of this command is a master-targeted PR), filling in only the Jira link and Summary. Leave all other sections of the PR template exactly as they are.

```bash
gh pr create --base master --title "<commit message subject>" --assignee "$(gh api user --jq .login)" --body "$(cat <<'EOF'
[<TICKET-KEY>](https://oktainc.atlassian.net/browse/<TICKET-KEY>)

## Summary

<confirmed description from Step 2>

## Testing & Screenshots

- [ ] I have confirmed this change with my designer and the Odyssey Pillar Captains.
<!-- Please include screenshots if it has visuals; otherwise, put "N/A". -->
EOF
)"
```

Capture and print the returned PR URL.

---

## Done

Print a summary:

- Jira ticket URL: `https://oktainc.atlassian.net/browse/<key>`
- PR URL (from Step 11)
- Branch name
- Worktree path (if Step 8a) — so the user can `cd` there for any follow-up work
- Commit message used
