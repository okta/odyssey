# 2026-07-01 — odyssey-blueprint-core is a separate package from odyssey-blueprint

- **Status:** Accepted
- **Date:** 2026-07-01
- **Author:** Kevin Ghadyani
- **Source:** commit 0c3f3a6526144e358bedaa63b47a0c4dc6f429e9
- **Area:** architecture
- **Tags:** #architecture #blueprint

## Decision (the rule)

Blueprint is split into two packages:

- `packages/contributions/odyssey-blueprint` — the full Blueprint product (page renderer,
  YAML page loader, product-specific components). Lives in contributions; not yet published.
- `packages/core/odyssey-blueprint-core` — the primitive building blocks (layout atoms,
  design-token-aware styled primitives) that core Odyssey components may reference.
  Lives in core; subject to the core API-stability contract.

These packages must not be merged back into one.

## What was rejected

A single `odyssey-blueprint` package in contributions that exports both the renderer and the
primitives. The split was motivated by a concrete need: core Odyssey components (in
`odyssey-react-mui`) needed to import Blueprint primitives (token-aware containers, grid
layouts) without taking a dependency on the full Blueprint product stack. A single
contributions package cannot be imported by a core package without creating an inverted
dependency graph.

## Why

The core ← contributions direction is forbidden in this monorepo. `odyssey-react-mui` (core)
cannot depend on `odyssey-blueprint` (contributions). By extracting the primitives into
`odyssey-blueprint-core` (also core), the primitives become available to `odyssey-react-mui`
without violating the dependency direction.

## How to honor it

- Primitives that core components need go in `packages/core/odyssey-blueprint-core`.
- Product-specific page-rendering logic stays in `packages/contributions/odyssey-blueprint`.
- Do not add a direct import from any `packages/core/` package to
  `packages/contributions/odyssey-blueprint`.

## Related

- [Blueprint uses a JSON UI renderer, not React-authored page shells](2026-06-23-blueprint-json-renderer.md)
- [Blueprint legacy kind-based form-field system retired](2026-06-23-blueprint-retire-kind-fields.md)
