# 2026-07-30 — Wait on Bacon via a disposable haiku subagent driving /bacon

- **Status:** Accepted
- **Date:** 2026-07-30
- **Author:** Ricardo Joenck
- **Source:** chat session, 2026-07-30
- **Area:** ai-workflow
- **Tags:** #release #bacon #subagent #tokens

## Decision (the rule)

Drive all release Bacon work through the `ord-skills:bacon` skill invoked as
`/bacon`, not through shell scripts that must locate the skill on disk. The main
release agent triggers each of the four Bacon stages (ci, promotion, backport,
public_release) by invoking `/bacon`, records the returned run id in the JSON
checkpoint, then hands the long wait to a background subagent (haiku model) that
polls `/bacon` to a terminal state and reports the raw status back. The main agent
never polls in a loop. The subagent appends a progress line to a per-stage handoff
file each cycle, so a re-run resumes the wait against the same run id instead of
re-triggering. The go/no-go for the two irreversible stages (promotion,
public_release) stays in the main agent, computed from the raw status the subagent
returns; the subagent returns data, not a decision.

## What was rejected

1. Shell wrappers (`trigger-bacon.sh`, `wait-for-bacon.sh`) fronting a resolver
   (`bacon-skill-dir.sh`) that hardcodes the plugin marketplace path
   (`${HOME}/.claude/plugins/marketplaces/.../skills/bacon`) and otherwise guesses
   the newest cache copy. Deleted. A shell script cannot invoke a skill, so it has
   to know where the skill's files live on disk. That path is an implementation
   detail of the plugin install: it moves across layout and version changes, and
   the wrappers also hardcode the skill's output shape. Depending on it inside
   committed release scripts is brittle.
2. The main agent polls Bacon directly (foreground shell poller or its own sleep
   loop). Rejected because every wake-up re-sends the whole conversation as input
   tokens and the status output accumulates in the main context for the rest of
   the run, and because a single foreground poll is capped near ten minutes per
   call, so a 20-30 minute pipeline would force repeated re-sends of a growing
   context.
3. A pure manual resume gate. Not rejected outright. It is retained as the
   documented fallback (see "Fallback" below).

## Why

The driving constraint is that nothing committed should depend on where the
`/bacon` skill is installed. An agent invoking `/bacon` through the Skill tool
needs no path at all, because the harness resolves the skill. That single fact
removes the resolver and both shell wrappers.

Bacon stages can run 20-30 minutes, occasionally more. The main agent runs on an
expensive model, so any polling it does costs twice: it re-sends the growing
conversation on every wake-up, and the status noise stays in context afterward,
making later stages more expensive. Handing the wait to a haiku subagent puts all
of that in a separate, throwaway context window; the main agent pays only for the
one status line the subagent returns. The subagent writes a progress line to a
handoff file each cycle so its progress is durable across re-invokes and resume,
rather than relying on an uninterrupted half-hour run.

Triggering stays in the main agent so it captures the run id synchronously and
records it in the checkpoint. A resumed release then reattaches to an in-flight run
instead of triggering a duplicate.

The one place none of this reaches is the go/no-go for the irreversible stages. A
small model must not be the thing that decides an artifact promotion or a public
publish should proceed. The subagent reports the raw terminal status; the main
agent maps that to success or failure.

## How to honor it

- In `.claude/commands/release/SKILL.md`, the main agent confirms `/bacon` is
  reachable once up front, triggers each Bacon stage via `/bacon` (recording the
  run id with `release-git.sh record-task`), then launches a background subagent
  (Agent tool, `model: haiku`) that polls `/bacon` to a terminal state, writes a
  progress line to `"$SF".wait-<stage>.md` each cycle, and returns
  `{"status":"...","runId":"..."}`.
- `SKILL.md`'s `allowed-tools` includes `Skill` and `Agent`. It must not reference
  `trigger-bacon.sh`, `wait-for-bacon.sh`, or `bacon-skill-dir.sh` — those files
  are deleted.
- `release-git.sh` no longer sources a Bacon resolver, and its preflight no longer
  checks the skill directory. The `/bacon` reachability check lives in the release
  skill.
- Keep the promotion and public_release go/no-go in the main agent. The subagent
  returns data, not a decision.
- Do not reintroduce a shell script that hardcodes the skill's install path, and
  do not move the poll loop into the main agent.

## Fallback

If the subagent approach proves costly or unreliable in practice (token spend
compounding across stages, flaky subagent runs, or the session-open requirement
becoming a burden), fall back to a pure manual resume gate: the main agent
triggers the task, records the run id, then stops and asks the operator to re-run
`/release --state-file <path>` once Bacon shows green. That path is the cheapest of
all and, unlike any subagent or background wait, survives the operator closing the
session, at the cost of the operator watching each stage. It is a documented, ready
alternative, not a rejected one.

## Related

- [Reuse established libraries over hand-rolling](2026-06-22-reuse-libraries-over-hand-rolling.md)

## Superseding this decision

When a later decision reverses this one, do not delete this file. Instead:

1. Change this file's Status to `Superseded by [new title](YYYY-MM-DD-new-slug.md)`.
2. Add a `> [!WARNING]` callout at the very top of this file pointing to the new record.
3. In the new record, add a `**Supersedes:** [this title](this-file.md)` line.
