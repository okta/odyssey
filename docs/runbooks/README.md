# Runbooks

A **runbook** is an executable playbook: a self-contained, step-by-step procedure
for a repeatable operation. Unlike a Claude skill or `AGENTS.md`, a runbook is
**not** loaded into an agent's context automatically. You point an agent at it (or
run it yourself) **on demand**, asynchronously, when you need to perform that
specific operation.

Runbooks are tool-agnostic — a teammate on any AI assistant (or a human) can
follow one. They live here so the procedure is versioned, reviewable, and shared.

## When to write a runbook vs. an AGENTS.md rule vs. a skill

| Vehicle                        | Loaded automatically?       | Use for                                                                                |
| ------------------------------ | --------------------------- | -------------------------------------------------------------------------------------- |
| `AGENTS.md`                    | Yes, every session          | Always-on rules and conventions                                                        |
| Skill (`.claude/`)             | On invocation, into context | Interactive, context-aware operations                                                  |
| **Runbook (`docs/runbooks/`)** | **No — run on demand**      | **Occasional, heavy, multi-step operations that would bloat context if always loaded** |

## Index

| Runbook                                                      | Purpose                                                                                                                     |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| [backfill-decision-records.md](backfill-decision-records.md) | Mine git history and Claude chat transcripts for undocumented decisions and produce ADRs in `docs/decisions/`               |
| [update-vrt-chrome-version.md](update-vrt-chrome-version.md) | Bump the `google-chrome-stable` version installed by the Visual Regression Test CI suite to the newest build in Artifactory |
