# 2026-06-29 — Removing code means removing every trace, including schemas and docs

- **Status:** Accepted
- **Date:** 2026-06-29
- **Author:** Kevin Ghadyani
- **Source:** chat session, 2026-06-29
- **Area:** process
- **Tags:** #process #ai-workflow

## Decision (the rule)

When removing a component or feature, delete every associated artifact in the same pass — source,
schema files, docs, stories, metadata entries. Leave no orphaned files referencing the removed
thing.

## What was rejected

Deleting the obvious source file(s) but leaving behind associated schema/doc files. The AI treats
"remove component X" as "delete X.tsx" and misses the satellite files (`XSchema.ts`, `X.mdx`,
metadata rows), leaving orphans that confuse future readers and tooling.

## Why

Orphaned schema/doc files still get indexed by tooling (MCP metadata, schema loaders) and read by
agents, so a "removed" component keeps haunting the codebase. The correction was emphatic: "There
are schema files for components in here we don't need either. Why did you leave those? … I want
no trace of those components."

## How to honor it

- When removing a component, grep for its name across the package and delete every match:
  source, `*Schema.ts`, `*.mdx`, stories, `contributionsMetadata.json` entries.
- Apply this in one pass — don't wait to be told about each leftover file (see the
  apply-package-wide convention).

## Related

- [File and folder names must be unique and descriptive — no generic names](2026-06-23-unique-descriptive-filenames.md)
