# 2026-06-23 — Re-export a scoped API surface, not a third-party catch-all namespace

- **Status:** Accepted
- **Date:** 2026-06-23
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-23
- **Area:** architecture
- **Tags:** #architecture #blueprint

## Decision (the rule)

When a public package wraps a third-party library, re-export a specific, curated set of that
library's functions — or require it as a `peerDependency` — never the library's entire catch-all
namespace object.

## What was rejected

Re-exporting zod's `z` catch-all from Blueprint. It looks convenient (one export, everything
available), but it forces every consumer to pull in the entire package and couples them to the
full third-party surface, defeating the point of wrapping the library at all.

## Why

A catch-all re-export means the wrapper hides nothing — consumers transitively depend on the
whole library and its bundle cost, and the wrapper can't evolve independently. Curated
re-exports (or a peer dependency) keep the public surface small, tree-shakeable, and swappable.
This is the same principle as the "hide implementation libraries" rule, applied to re-export
granularity.

## How to honor it

- Re-export named functions the wrapper actually supports, not the library's umbrella object.
- If consumers genuinely need the full library, make it a `peerDependency` they install directly.
- Don't `export * from "third-party"` or re-export its top-level namespace object.

## Related

- [Reuse established libraries and in-repo patterns, don't hand-roll](2026-06-22-reuse-libraries-over-hand-rolling.md)
