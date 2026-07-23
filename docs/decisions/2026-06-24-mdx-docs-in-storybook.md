# 2026-06-24 — MDX component docs live in Storybook, not a top-level docs folder

- **Status:** Accepted
- **Date:** 2026-06-24
- **Author:** Kevin Ghadyani
- **Source:** commits bd7b5926cf2fcd3aef9b8776047ec3a86c9e9a3a, 8312e29ca6735cbd8535de720ab7dfe70b6d9574
- **Area:** docs
- **Tags:** #docs #storybook

## Decision (the rule)

All component MDX documentation files live inside
`packages/apps/odyssey-storybook/src/` alongside their stories. They do not live in a
top-level `docs/` folder, a `packages/core/odyssey-react-mui/docs/` folder, or any other
location. Storybook is the rendered surface for component docs.

## What was rejected

A separate `docs/` tree at the repo root (or at the core package level) for MDX docs. This
was the prior state — MDX files lived in `packages/apps/odyssey-storybook/src/Docs/` in
folders that duplicated the Storybook category structure but were disconnected from the stories
themselves. The files were hard to find ("is this doc in Docs/ or next to the story?") and
the drift between doc and story was invisible.

## Why

Co-locating MDX docs with stories means:

1. When a story changes, the related doc is one directory away.
2. Storybook's autodocs can pull from the MDX in the same directory.
3. There is one canonical location — no "is it in Docs/ or src/?" confusion.

The `docs/decisions/` folder (this folder) is the exception — architectural decision records
are not component docs and do not belong in Storybook.

## How to honor it

- New component MDX documentation goes in `packages/apps/odyssey-storybook/src/` next to
  the component's stories.
- Do not create a new `docs/` directory for component docs.
- `docs/decisions/` (ADRs) is the only legitimate use of the top-level `docs/` folder.

## Related

- [AGENTS.md is the canonical AI instruction file](2026-02-20-agents-md-canonical-ai-instructions.md)
