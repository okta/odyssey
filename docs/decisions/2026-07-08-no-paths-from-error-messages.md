# 2026-07-08 — Don't create files or directories to satisfy an error-message path

- **Status:** Accepted
- **Date:** 2026-07-08
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-07-08
- **Area:** process
- **Tags:** #process #ai-workflow

## Decision (the rule)

Do not create files or `mkdir` directories just because an error message references a path. If a
target directory doesn't exist and you'd have to create it, stop and confirm the correct location
instead of inventing structure.

## What was rejected

Following an error message's path literally — e.g. creating a `.nono.jsonc` and `mkdir -p`'ing a
non-existent `okta-core` directory because an error mentioned that path. The AI treats the error's
path as ground truth and manufactures the structure to make the error stop.

## Why

An error referencing a path usually means something is misconfigured or the AI is in the wrong
place — not that the path should be created. Manufacturing directories/files to silence the error
scatters bogus structure across the repo (or worse, into a sibling repo). The correction: "Why did
you add that file to okta-core?"

## How to honor it

- Treat a path in an error message as a symptom to diagnose, not an instruction to create.
- If satisfying an error would require `mkdir` of a directory that doesn't exist, stop and confirm.
- Verify you're operating in the intended repo/worktree before creating anything.

## Related

- [Read the current file before editing; revert only your own last change](2026-06-25-read-current-state-before-editing.md)
