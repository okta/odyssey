# Runbook — Backfill decision records from git history and Claude chats

**Goal:** discover architectural/tooling/process decisions that were made but never
documented, and turn each into an append-only record in `docs/decisions/`. Also
surface places where AI agents repeatedly got something wrong, so the fix can be
promoted into `AGENTS.md`.

**When to run:** periodically (e.g. per milestone), after a large feature branch
merges, or when regressions suggest an undocumented decision is being re-litigated.

**Async / delegated:** this is heavy (reads full git diffs and large transcript
sets). Run it as a delegated agent task or a subagent fleet, not inline in a normal
working session.

---

## Prerequisites

- A git worktree branched off `master` (never edit the main checkout — the owner
  runs Storybook from it):
  ```sh
  git worktree add .claude/worktrees/<branch> master -b <branch>
  ln -sfn "$(git rev-parse --show-toplevel)/node_modules" .claude/worktrees/<branch>/node_modules
  ```
- Familiarity with the ADR format in `docs/decisions/TEMPLATE.md` and the existing
  index in `docs/decisions/README.md` (so you don't re-file covered decisions).

---

## Part A — Mine git history

The failure mode to avoid: **reading commit subjects only.** A subject tells you
_what_ changed, never _what was rejected and why_. Read diffs and full bodies.

1. **List candidates** across all branches, full bodies:
   ```sh
   git log master --format=%B --since=<START_DATE>
   git log --all --follow -p -- AGENTS.md      # every rule block is a candidate
   git log <feature-branch> --not master --format=%B
   ```
2. **For each candidate, read the diff** (`git show <hash>`). Decide:
   - (a) new decision record, (b) already covered, or (c) too minor (pure style).
3. **Bias toward** decisions that fixed a **regression** or were **re-litigated**
   (reversed, then re-reversed). Those are the whole point of the log — find the
   commit that reversed an earlier commit and document both directions.
4. **Fan out with subagents** for breadth: one subagent per branch or per date
   range, each returning a terse list of `{proposed filename, one-line decision,
one-line rejected-alternative, evidence hash, confidence}`. The orchestrator
   dedupes against the existing index and writes the files.

## Part B — Mine Claude chat transcripts for agent mistakes

Transcripts live at `~/.claude/projects/<url-encoded-repo-path>/*.jsonl`
(for this repo: `~/.claude/projects/-Users-kevin-ghadyani-okta-odyssey-design-system/`).
Each line is one JSONL event (user turn, assistant turn, tool call/result).

What you are hunting for:

- **User corrections** — the user telling the agent it did something wrong
  ("no, don't…", "that's not how we…", "revert that", "why did you…"). Each is a
  latent rule or decision.
- **Repeated mistakes** — the same correction appearing across multiple sessions.
  Repetition = it belongs in `AGENTS.md`, not just a one-off fix.
- **Reversals** — the agent doing X, being told to do Y instead. A candidate
  superseding decision.

Extraction approach (subagent fleet — do NOT load 193 MB into one context):

1. Shard the transcript files across N subagents (e.g. 10–15 files each).
2. Each subagent greps its shard for correction signals, reads the surrounding
   turns for context, and returns a structured list:
   `{quote (≤150 chars), session file, what the agent did, the correction, is it
already in AGENTS.md? (yes/no), proposed vehicle (AGENTS rule | decision record)}`.
   Example grep seeds (case-insensitive): `no,`, `don't`, `stop`, `revert`,
   `that's wrong`, `why did you`, `we don't`, `never `, `instead`, `actually`.
3. The orchestrator merges shard reports, **counts recurrence** (a correction seen
   in 3+ sessions is high priority), dedupes against current `AGENTS.md` and
   `docs/decisions/`, and proposes: new AGENTS rule, new decision record, or both.

> Privacy: transcripts may contain internal ticket IDs, tokens, or names. When a
> finding becomes a committed record, scrub it — no Jira IDs in source/comments
> (public mirror), no secrets, short verbatim quotes only.

## Part C — Produce the records

1. For each confirmed decision, copy `docs/decisions/TEMPLATE.md` →
   `docs/decisions/YYYY-MM-DD-slug.md` (date = decision date recovered from git/chat).
2. Fill **every** section. The load-bearing one is **What was rejected**.
3. Cross-link related records with `[[YYYY-MM-DD-other-slug]]`.
4. For reversals: supersede, don't delete (see `docs/decisions/README.md` protocol).
5. Add a row to the `docs/decisions/README.md` index table.
6. For recurring agent mistakes, also add/adjust the terse rule in `AGENTS.md`.
7. Commit `docs: …`, push, open a PR targeting `master` (base = the branch you
   forked from), following the PR template exactly.

---

## Appendix — reusable prompt for teammates

Hand this to a teammate so they can contribute decisions from **their own** Claude
chat history. They run it as a delegated/async agent task in a worktree.

> Branch a worktree off `master` and contribute to the append-only decision log in
> `docs/decisions/` (read its `README.md` and `TEMPLATE.md` first; read
> `docs/runbooks/backfill-decision-records.md` for the full procedure).
>
> Go through **your** Claude Code chat transcripts for this repo (at
> `~/.claude/projects/-Users-<you>-.../*.jsonl`) and the git history of every
> branch you've worked on since you started using Claude. Use subagents to shard
> the work — do not load all transcripts into one context.
>
> For each notable decision you made that isn't already in `docs/decisions/` —
> especially ones where you rejected an alternative, fixed a regression, or
> reversed an earlier choice — add a dated record using the template. Read commit
> **diffs**, not just subjects. For anything where an agent repeatedly did the
> wrong thing, propose an `AGENTS.md` rule too.
>
> Do not edit the main checkout. Do not commit any scratch/handoff files. Open one
> PR targeting `master` with your additions, following the PR template exactly.
