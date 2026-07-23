# 2026-06-23 — Blueprint legacy kind-based form-field system retired

- **Status:** Accepted
- **Date:** 2026-06-23
- **Author:** Kevin Ghadyani
- **Source:** commits b0923234181835451d630ad428c4006cfff7c185, f0367cd25835e7ee3425281a8c469be4779e2150
- **Area:** architecture
- **Tags:** #architecture #blueprint

## Decision (the rule)

The Blueprint `kind`-based form-field dispatch system is retired. Fields are no longer
described as `{ kind: "text" | "select" | ... }` objects that a switch statement routes to
a renderer. The replacement is direct schema types with explicit renderer bindings.

## What was rejected

Extending the `kind` system with new field types. The natural AI drift when adding a new
field type to Blueprint is to add a new `kind` value to the existing union and add a branch
to the switch renderer. This was rejected because the kind system had accumulated 8+ field
types with subtle behavioral differences, no TypeScript narrowing between kinds, and a `dedent`
utility that was used inconsistently across field types.

## Why

The `kind` dispatch pattern prevented TypeScript from narrowing field types — a `kind: "text"`
field and a `kind: "select"` field were the same type until you checked the discriminant at
runtime. This led to runtime errors when consumers passed the wrong field shape. The
replacement uses TypeScript discriminated unions with dedicated types per field, so wrong field
shapes are caught at compile time.

## How to honor it

- Do not add new `kind` values to any Blueprint field schema.
- New field types get their own TypeScript type in the relevant schema file.
- The legacy `fieldSchema.ts` file (now renamed `<folder>FieldSchema.ts`) is the migration
  boundary — existing entries are kept for backward compatibility but no new entries go in.

## Related

- [Blueprint v3 schema uses versioned identifiers and an inputs/events envelope](2026-07-06-blueprint-v3-versioned-envelope.md) — the replacement for the retired `kind:`
  shape (versioned identifiers + inputs/events envelope + lazy registry). This record covers
  only the _removal_ of `kind:`; the v3 record covers what replaced it.
- [Blueprint uses a JSON UI renderer, not React-authored page shells](2026-06-23-blueprint-json-renderer.md)
- [odyssey-blueprint-core is a separate package from odyssey-blueprint](2026-07-01-blueprint-core-package-split.md)
