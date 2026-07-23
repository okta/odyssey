# 2026-07-06 — RTK (Rust Token Killer) filters Bacon/git output to cut token cost

- **Status:** Accepted
- **Date:** 2026-07-06
- **Author:** Kevin Ghadyani (RTK owner), Ricardo Joenck (repo integration)
- **Source:** commit 2798d17a51b8f32dac5d9a892fcf54a509ad07c4
- **Area:** ai-workflow
- **Tags:** #ai-workflow #tooling

## Decision (the rule)

All shell commands executed by agents inside this repo pass through RTK (Rust Token Killer),
a CLI proxy that strips noise from command output before it reaches the AI context window.
Custom RTK filter rules live in the project's RTK config. The proxy is installed globally and
invoked via the Claude Code hook that rewrites `git`, `yarn`, etc. commands automatically.

## What was rejected

Raw command output piped directly into the AI context. Bacon CI output, `git log`, and
`yarn` install output contain large amounts of structured log noise (timestamps, progress
bars, ANSI sequences) that consumes tokens without adding information. The cost was 60–90%
of token spend on build/lint/test commands before RTK was introduced.

## Why

Token cost is real money and latency. RTK was added after profiling showed that a typical
"run yarn typecheck" cycle was spending the majority of tokens on boilerplate output lines.
Filtering that output down to errors + summary lines makes agents faster and cheaper without
losing signal.

## How to honor it

- Do not remove or bypass RTK when running commands. If RTK is filtering something that should
  be visible, add a project-specific passthrough rule to the RTK config.
- The `rtk gain` and `rtk discover` meta-commands show savings analytics and missed
  optimization opportunities.
- RTK config is checked into the repo; changes to filter rules go through PR review.

## Related

- [AGENTS.md is the canonical AI instruction file](2026-02-20-agents-md-canonical-ai-instructions.md)
