# 2026-07-06 — Blueprint v3 schema uses versioned identifiers and an inputs/events envelope

- **Status:** Accepted
- **Date:** 2026-07-06
- **Author:** Kevin Ghadyani
- **Source:** commits fefbf0e8998a8f11890cc815646fae0697b0eea8, 68b5b177531bf4ce36febe6f577a6c969567a21d
  (branch `origin/kg_blueprint-visual`, not yet merged to master)
- **Area:** architecture
- **Tags:** #architecture #blueprint

## Decision (the rule)

Blueprint v3 building blocks are referenced by a **namespaced, version-pinned discriminator**,
e.g. `from: "odyssey-blueprint/action-menu@1"`, and carry an
`{ instanceId, inputs, events }` envelope. The renderer registry maps that same versioned
identifier to a **lazy loader**. This is the successor to the retired v2 `kind:` system.

> Note: this decision currently lives on the unmerged `kg_blueprint-visual` branch. It is
> recorded here so it is not re-litigated; confirm the final shape when the branch merges.

## What was rejected

1. **The flat v2 `kind:` + spread-props shape** (see the retire-kind-fields record) — no
   versioning, no TypeScript narrowing, ambiguous field ownership.
2. **An eager component map** in the registry — loads every building block up front; rejected in
   favor of lazy loaders keyed by the versioned identifier.
3. **Unversioned identifiers** (`from: "action-menu"`) — would make it impossible to evolve a
   block's contract without breaking existing pages. The `@1` suffix lets `@2` coexist.

## Why

Version-pinning the identifier lets a building block's input/event contract evolve without
breaking pages authored against the old contract — old pages keep referencing `@1` while new
pages adopt `@2`. The `inputs`/`events` envelope separates data-in from events-out explicitly,
which the flat spread-props shape could not express. Lazy loaders keep the renderer bundle from
pulling in every block. (A union type had to be explicitly annotated to stop the type-aware lint
from OOMing — see commit 68b5b17753….)

## How to honor it

- New building blocks declare a versioned `from: "odyssey-blueprint/<name>@<n>"` identifier.
- Evolve a contract by publishing `@2`, not by mutating `@1` in place.
- Register blocks as lazy loaders keyed by the versioned identifier.
- Data/events flow through the `{ inputs, events }` envelope, not arbitrary spread props.

## Related

- [Blueprint legacy kind-based form-field system retired](2026-06-23-blueprint-retire-kind-fields.md) (this supersedes the v2 shape it retired)
- [Blueprint uses a JSON UI renderer, not React-authored page shells](2026-06-23-blueprint-json-renderer.md)
- [odyssey-blueprint-core is a separate package from odyssey-blueprint](2026-07-01-blueprint-core-package-split.md)
