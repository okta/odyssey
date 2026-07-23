# 2026-06-25 — Read the current file before editing; revert only your own last change

- **Status:** Accepted
- **Date:** 2026-06-25
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-25
- **Area:** process
- **Tags:** #process #ai-workflow

## Decision (the rule)

Always read the latest state of a file immediately before editing it. When asked to revert,
revert only your own most recent changes — restore the file to how it was right before you
touched it, never to an arbitrary earlier revision.

## What was rejected

Editing from a stale in-context copy, and — when asked to "revert" — rolling the file all the way
back to a much older version (e.g. yesterday's), discarding intervening edits the AI didn't make.
The instinct is to treat "revert" as "restore the version I remember," which destroys other
people's work.

## Why

The file on disk may have changed since the AI last read it (another agent, the user, a linter).
Editing a stale copy silently clobbers those changes. "Revert" that reaches past your own edits
does the same at larger scale. The correction was blunt: "You returned the entire doc back to
what it was yesterday. I want you to return it back to what it was right before you made your
changes. … Look at the current doc before making changes."

## How to honor it

- Re-read a file right before editing if any time has passed since the last read.
- Scope reverts to your own diff; if unsure what you changed, inspect the diff rather than
  guessing at an older revision.
- Never restore a whole file to a dated snapshot unless explicitly told to.

## Related

- [Fix the root cause, not the symptom; verify the real cause first](2026-06-30-root-cause-over-symptom-patch.md)
