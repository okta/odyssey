---
description: Use when the user has uncommitted changes ready to ship and wants to create a Jira ticket, open a branch, commit, push, and open a PR in one flow. Use only when explicitly invoked — never auto-trigger.
---

# /shipit — Jira + branch + commit + push + PR workflow

End-to-end workflow for shipping a small fix or task. Starting from uncommitted local changes, it creates a linked Jira ticket, opens a new branch, commits, pushes, and opens a pull request — all in one flow.

**Prerequisites:**

- Uncommitted changes already in place
- `gh` CLI authenticated (`gh auth status`)
- Jira ord-skill installed (`~/.claude/plugins/cache/ord-claude-plugins/ord-skills/`)

**Produces:**

- A Jira ticket (Task or Bug) assigned to the UICore Odyssey component
- A branch named `<initials>-<slug>-<OKTA-XXXXX>`
- A single conventional commit
- A pull request with the Jira link and summary pre-filled

**Optional arguments** (parse from `$ARGUMENTS` before starting):

- `--jira <KEY>` — skip Steps 3–7b (Jira ticket creation, transitions, priority, epic, sprint) and use this existing ticket key throughout.
- `--branch <name>` — skip Step 8 (branch creation) and check out this existing branch instead.

Both flags are optional and independent — either, both, or neither may be provided.

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

---

## Step 3: Gather Jira task details

**If `--jira <KEY>` was provided:** skip Steps 3 through 6 entirely. Use the provided key as the ticket key for all subsequent steps.

---

Use AskUserQuestion to collect the following. Ask all at once if possible:

1. **Issue type** — Task or Bug
2. **Priority** — P0, P1, P2, P3, P4, or leave empty (will be untriaged)

Default priority is empty. Issue type is required.

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

From Triaged, move to In Progress using "Start Progress":

```bash
$JIRA_SKILL/scripts/write/transition_jira.sh <key> --transition "Start Progress"Expand commentComment on lines R149 to R154Resolved
```

If this fails, run `--list` to discover the correct transition name from Triaged and use that instead.

---

## Step 6: Set priority (if provided)

If the user specified a priority (P0–P4):

```bash
$JIRA_SKILL/scripts/write/edit_jira.sh <key> --field Priority --value <priority>
```

Skip this step if left empty.

---

## Step 8: Create the branch

**If `--branch <name>` was provided:** check out that branch instead of creating one.

```bash
git checkout <name>
```

Skip the rest of this step.

---

**Otherwise** — default base branch is `master` unless the user specifies otherwise.

If there are uncommitted changes, stash them first so the branch switch succeeds:

```bash
git stash
git checkout master
git pull origin master
git stash pop
git checkout -b <initials>-<slug>-<ticket-key>
```

Example result: `rj-fix-autocomplete-stories-OKTA-1151880`

If already on a branch other than master, ask whether to base off master or the current branch before proceeding.

---

## Step 9: Stage and commit

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

## Step 10: Push

```bash
git push -u origin <branch-name>
```

---

## Step 11: Create the pull request

Use `gh pr create` with the default PR template, filling in only the Jira link and the Summary section. Leave all other sections exactly as they are in the template.

```bash
gh pr create --title "<commit message subject>" --assignee "$(gh api user --jq .login)" --body "$(cat <<'EOF'
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
- Commit message used
