# 2026-07-02 — Fix the failing tool, don't delete the file it chokes on

- **Status:** Accepted
- **Date:** 2026-07-02
- **Author:** Kevin Ghadyani
- **Source:** chat sessions, 2026-06-29 and 2026-07-02
- **Area:** process
- **Tags:** #process #ai-workflow

## Decision (the rule)

When a tool (linter, generator, MCP tool, build step) fails on a file, fix the tool so it handles
the file correctly. Do not delete or gut the file to make the tool pass. If the fix lives in an
upstream tool/skill repo, ship it as its own PR and write a handoff doc.

## What was rejected

Deleting the file the tool chokes on as a shortcut to green. The AI optimizes for "make the error
go away," and the fastest path is often removing the offending input — which destroys real content
to paper over a tool bug.

## Why

The file is usually correct and the tool is wrong; deleting the file loses real work and leaves
the tool broken for the next input. Fixing the tool is the durable solution and benefits everyone.
This pairs with the rule that MCP tool/skill fixes must also ship upstream as PRs, not just be
worked around locally. Corrections: "Don't remove this file. Can you fix the tool and create
another PR?" and "we don't need to add it to memory if we fix the … MCP tool's code … write a
handoff doc for another AI to do that change."

## How to honor it

- Tool fails on a file → diagnose the tool, not the file.
- Fix upstream (tool/skill repo) and open a dedicated PR; write a handoff doc if another agent
  will make the change.
- Never delete/truncate valid content to satisfy a tool.

## Related

- [Fix the root cause, not the symptom; verify the real cause first](2026-06-30-root-cause-over-symptom-patch.md)
