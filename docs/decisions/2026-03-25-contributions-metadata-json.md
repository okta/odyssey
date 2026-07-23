# 2026-03-25 — contributionsMetadata.json lives in every contributions package

- **Status:** Accepted
- **Date:** 2026-03-25
- **Author:** Kevin Ghadyani
- **Source:** commit ff523d25f381890caa6d4d35af681d0a2193ca0a
- **Area:** architecture
- **Tags:** #architecture #contributions

## Decision (the rule)

Every package under `packages/contributions/**` must ship a `contributionsMetadata.json` at its
package root. This file declares the package's components, their status, and any promotion-readiness
metadata. ESLint enforces its presence and schema.

## What was rejected

Maintaining a central registry file at the repo root (or inside odyssey-cli) that lists all
contributions packages. A central file becomes stale immediately — teams add components without
updating the registry, and the registry diverges from reality. Co-located metadata stays accurate
because it lives next to the code it describes.

## Why

The promote-contribution workflow, the contribution-sync CLI command, and agent tooling (MCP
metadata generation) all need to discover contributions packages and their components
programmatically. Without a per-package manifest the only option is filesystem glob + heuristics,
which breaks when teams use non-standard layouts.

## How to honor it

- When scaffolding a new contributions package (`contribution-setup` skill), the metadata file
  is created automatically.
- When adding a component to a contributions package, add it to that package's
  `contributionsMetadata.json`.
- The `feat: verify contributions metadata eslint (#261)` ESLint rule rejects builds where the
  metadata is missing or malformed.

## Related

- [Contributions packages use a shared stack, not isolated deps](2026-03-25-contributions-shared-stack.md)
- [odyssey-cli owns contribution sync and promotion](2026-04-23-odyssey-cli-contribution-sync.md)
- [contribution-promote skill drives the promotion workflow](2026-05-20-contribution-promote-skill.md)
