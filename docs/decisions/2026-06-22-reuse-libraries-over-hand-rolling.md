# 2026-06-22 — Reuse established libraries and in-repo patterns, don't hand-roll

- **Status:** Accepted
- **Date:** 2026-06-22
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-22
- **Area:** architecture
- **Tags:** #architecture #coding-conventions

## Decision (the rule)

Before implementing infrastructure by hand (CLI arg parsing, output formatting, common
transforms), use an established library or an existing pattern already in this repo. Prefer
`yargs` for CLI parsing over bespoke `process.argv` handling; look for a sibling package that
already solved the problem and copy its approach.

## What was rejected

Hand-rolling the mechanism because it's "just a few lines." The AI's instinct is to write a
small custom parser/formatter inline rather than pull in the library the repo already uses. This
produces divergent, untested reimplementations of solved problems.

## Why

Every hand-rolled parser is another thing to test, maintain, and keep consistent with the rest
of the monorepo. The repo already standardizes on specific libraries and patterns; reusing them
keeps behavior uniform and shifts the maintenance burden onto a maintained dependency. The
correction was explicit: "We shouldn't be doing this ourselves. We have other examples in this
repo."

## How to honor it

- Before writing infra code, grep the repo for an existing solution or library usage.
- For CLI tooling, use `yargs` (already a dependency) rather than manual `process.argv` parsing.
- If no library fits, match the closest existing in-repo pattern instead of inventing a new one.

## Related

- [Re-export a scoped API surface, not a third-party catch-all namespace](2026-06-23-scoped-reexport-not-catchall.md)
- [Functions take one object arg with inline-defaulted DI; types co-locate](2026-04-16-functional-conventions-single-object-arg-di.md)
