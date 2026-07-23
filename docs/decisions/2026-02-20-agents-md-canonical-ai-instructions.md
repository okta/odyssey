# 2026-02-20 — AGENTS.md is the canonical AI instruction file

- **Status:** Accepted
- **Date:** 2026-02-20
- **Author:** Kevin Ghadyani
- **Source:** commit e5ecdcd4fb084275c13770bc846482f5441751bb
- **Area:** ai-workflow
- **Tags:** #ai-workflow #agents-md

## Decision (the rule)

`AGENTS.md` at the repo root is the single source of truth for AI agent instructions. Every AI tool
(Claude, Gemini, GitHub Copilot, and any future tool) must point to this file. Tool-specific shim
files (`.claude/ai.md`, `.gemini/ai.md`, `.github/copilot-instructions.md`) contain one line
redirecting here.

## What was rejected

Maintaining separate instruction files per tool. The natural drift is for each AI tool to accumulate
its own rules file that diverges from the others — Claude gets one set of rules, Copilot gets a
subset, Gemini gets none. This guarantees agents make inconsistent decisions depending on which
tool happens to be used.

## Why

One file means one update location. When a rule changes (naming conventions, PR template, test
style), it changes in one place and every tool picks it up on the next conversation. Diverged
instruction files are invisible technical debt that cause regressions silently.

## How to honor it

- Never add substantive rules to `.claude/CLAUDE.md`, `.gemini/ai.md`, or
  `.github/copilot-instructions.md`. Those files must only `@include` or link to `AGENTS.md`.
- When a new coding rule is established (from a code review, a regression fix, a PR comment),
  update `AGENTS.md` — not memory, not a comment in code.
- Package-level overrides go in `packages/.../AGENTS.md` and are listed in the root
  `AGENTS.md` table in §11.

## Related

- [RTK (Rust Token Killer) filters Bacon/git output to cut token cost](2026-07-06-rtk-token-filtering.md)
