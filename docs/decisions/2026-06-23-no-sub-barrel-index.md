# 2026-06-23 — No sub-barrel index.ts files inside packages

- **Status:** Accepted
- **Date:** 2026-06-23
- **Author:** Kevin Ghadyani
- **Source:** commits c6525eaf700fc3fd3040192a815bd84afda3750b, f4d13fae755a54e659b7c691baa46bd6fe2583c2
- **Area:** naming
- **Tags:** #naming #coding-conventions

## Decision (the rule)

Each package has exactly one `index.ts` barrel at its top level. Sub-directories must not have
their own `index.ts` files. Re-export from named files directly, not through sub-barrels.

## What was rejected

Sub-directory `index.ts` barrels (e.g., `src/components/index.ts` that re-exports all
components, then `src/index.ts` re-exports from `src/components/index.ts`). The natural AI
habit is to create an `index.ts` wherever files need grouping — it feels tidy. But sub-barrels
cause tree-shaking failures (bundlers can't statically analyze the re-export chain), circular
dependency issues, and import path confusion (two valid import paths for the same symbol).

## Why

Two specific bugs drove this rule:

1. Tree-shaking broke on several bundlers because intermediate barrels obscured which exports
   were actually used, causing consumers to accidentally import everything.
2. Circular dependency errors in the TypeScript checker were caused by sub-barrels that
   accidentally created import cycles.

Removing sub-barrels also forces better file naming — if `components/index.ts` is gone,
files must be named after what they export, which satisfies the unique-filename rule.

## How to honor it

- When generating a new file in a sub-directory, import it directly from its path in the
  top-level `index.ts`. Do not create a local `index.ts` in the sub-directory.
- If a sub-directory `index.ts` already exists, migrate its contents and delete it.
- Exception: the top-level `index.ts` barrel is always acceptable.

## Related

- [File and folder names must be unique and descriptive — no generic names](2026-06-23-unique-descriptive-filenames.md)
- [V1 suffix uses PascalCase (no underscore): WizardV1, not Wizard_v1](2026-06-23-v1-suffix-pascalcase.md)
