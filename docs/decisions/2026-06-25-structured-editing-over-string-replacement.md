# 2026-06-25 — Prefer structured/data-driven transforms over string replacement

- **Status:** Accepted
- **Date:** 2026-06-25
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-25
- **Area:** architecture
- **Tags:** #architecture #ai-workflow

## Decision (the rule)

Transform structured data with structured operations (AST edits, object/data-driven walks such
as `dotWalkString` over a values object), not raw string find-and-replace.

## What was rejected

String replacement for transformations over structured content (code, templates, config). The
AI reaches for `.replace()` because it's quick, but it is brittle: it silently mangles matches
inside strings/comments, breaks on formatting changes, and can't be validated.

## Why

Structured transforms operate on the real shape of the data, so they are correct regardless of
whitespace, quoting, or incidental substring matches. String replacement encodes assumptions
about exact text that break the moment the source is reformatted. The correction: "We should be
using structured instead of string replacement."

## How to honor it

- For code transforms, use an AST (the repo's codemods already do).
- For template/value substitution, resolve against a data structure (e.g. `dotWalkString` over a
  values object), not regex on the rendered string.
- Reserve string replacement for genuinely unstructured text.

## Related

- [Reuse established libraries and in-repo patterns, don't hand-roll](2026-06-22-reuse-libraries-over-hand-rolling.md)
