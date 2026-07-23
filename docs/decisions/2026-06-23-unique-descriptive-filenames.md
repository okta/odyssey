# 2026-06-23 — File and folder names must be unique and descriptive — no generic names

- **Status:** Accepted
- **Date:** 2026-06-23
- **Author:** Kevin Ghadyani
- **Source:** commit d1d5f3be4fa661c969941dd5112a09af2b1618f5
- **Area:** naming
- **Tags:** #naming

## Decision (the rule)

Every file must be named after its folder/concept so the repo reads like a flat, searchable
filesystem. Forbidden generic names: `schema.ts`, `types.ts`, `utils.ts`, `README.md` (inside
component folders), `index.ts` for non-top-level barrels. No leading underscores on filenames
or folder names. Correct form: `<folder>Schema.ts`, `<Component>.mdx`.

## What was rejected

Generic filenames that repeat across the repo. The AI's natural habit is to create `schema.ts`
in every directory that needs a schema, `types.ts` in every directory that has shared types, and
so on. This produces a repo where `grep schema.ts` returns 15 matches and you cannot distinguish
them in editor tabs, fuzzy-file-open, or git diffs.

Also rejected: leading underscores for "private" or "shared" folders (e.g., `_shared/`). These
are a convention from older JS tooling and have no meaning to TypeScript or Vite.

## Why

This rule was extracted from a recurring pattern of confusion during Blueprint development where
multiple `schema.ts` and `types.ts` files existed simultaneously and agents kept editing the
wrong one. Unique names make the wrong-file mistake impossible.

## How to honor it

- `schema.ts` → `<folderName>Schema.ts` (e.g., `reactSlot/reactSlotSchema.ts`)
- `types.ts` → co-locate types in the originating file or name by concept
- Component docs → `<Component>.mdx` never `README.md`
- When one file is flagged, fix every matching file in the package in the same pass
- No leading underscores: `_shared.ts` → `shared.ts` or fold into the owning module

## Related

- [No sub-barrel index.ts files inside packages](2026-06-23-no-sub-barrel-index.md)
- [V1 suffix uses PascalCase (no underscore): WizardV1, not Wizard_v1](2026-06-23-v1-suffix-pascalcase.md)
