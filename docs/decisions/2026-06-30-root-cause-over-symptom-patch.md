# 2026-06-30 — Fix the root cause, not the symptom; verify the real cause first

- **Status:** Accepted
- **Date:** 2026-06-30
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-30
- **Area:** process
- **Tags:** #process #ai-workflow

## Decision (the rule)

When a bug reproduces, find and fix the underlying cause before editing component code. If the
issue is reproducible through a provider/config setting (e.g. `hasCssBaseline` giving
`box-sizing: border-box`), fix it at that level rather than patching CSS on the component.

## What was rejected

Patching the symptom — e.g. adding `overflow: hidden` to a component to hide a Select popover
overflow. The AI's instinct is to make the visible symptom disappear with a local CSS tweak. In
this case no component change was needed at all; the real fix was a provider-level box-sizing
setting.

## Why

Symptom patches accumulate as unexplained CSS that later maintainers can't safely remove, and
they mask the actual defect so it resurfaces elsewhere. Verifying the real cause first (does it
reproduce with a different provider config?) leads to a smaller, correct fix — often no component
change at all.

## How to honor it

- Reproduce the bug and test whether a provider/config setting changes it before editing source.
- Don't add defensive CSS (`overflow: hidden`, fixed heights) to suppress a symptom.
- State the root cause in the PR; if the fix is "no change needed here," say so.

## Related

- [Read the current file before editing; revert only your own last change](2026-06-25-read-current-state-before-editing.md)
