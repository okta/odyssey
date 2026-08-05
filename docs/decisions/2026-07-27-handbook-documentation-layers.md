# Use lifecycle-based documentation layers

- **Status:** Accepted
- **Date:** 2026-07-27
- **Author:** Ricardo Joenck
- **Source:** chat session, 2026-07-27
- **Area:** docs
- **Tags:** #docs #contributions #public-mirror

## Decision (the rule)

Use `docs/handbook/` for durable, current guidance that spans packages. Use root
`CONTRIBUTING.md` as the conventional router to contribution workflows. A
contribution is a home-team-owned package under `packages/contributions/`.
Changes elsewhere in the repository are Odyssey-owned maintenance.

## What was rejected

We rejected placing the handbook at the repository root because current guidance
is documentation and belongs with the other documentation lifecycles under
`docs/`. We also rejected expanding `guidelines/` because it described only
design-system usage and did not provide a natural home for repository orientation
or engineering workflows.

We also rejected making root `CONTRIBUTING.md` a Core-only guide. Humans, GitHub,
and agents discover that filename by convention, so narrowing it would hide the
home-team-owned contribution and Odyssey-owned maintenance paths. Detailed
workflows live in the handbook instead of being duplicated at the root.

## Why

The repository grew from a small Core-focused project into a monorepo containing
Core packages, independently owned contribution packages, apps, configuration,
platform packages, and tools. The previous root documents reflected the earlier
shape and did not clearly distinguish contribution packages from Odyssey-owned
maintenance.

Lifecycle-based layers tell readers whether a document is current guidance,
historical rationale, an operational procedure, or a package contract. Using the
package location to determine contribution ownership is deterministic for humans,
agents, and tooling and changes naturally when a package graduates into Core.

## How to honor it

- Put cross-package, durable human guidance under `docs/handbook/`.
- Keep design guidance under `docs/handbook/design/`, contribution workflows under
  `docs/handbook/contributing/`, and cross-cutting test guidance under
  `docs/handbook/testing/`.
- Keep accepted and superseded rationale under `docs/decisions/` and repeatable
  procedures under `docs/runbooks/`.
- Convert completed planning material into a decision or runbook when it contains
  durable knowledge; otherwise remove it when the task finishes.
- Keep package API and operational documentation with the owning package.
- Keep automatically loaded machine constraints in `AGENTS.md`; link to the
  handbook for domain meaning rather than copying human workflows.
- Use _contribution_ for home-team-owned packages under
  `packages/contributions/`. Do not require the phrase _Odyssey Contribution_ or
  use _contribution_ for Odyssey-owned maintenance elsewhere in the repository.
- Exclude `docs/handbook/` as one unit from the public mirror so internal guidance
  does not require partial publication rules or mirror-safe link variants.
- Keep this decision record in the public mirror as history of the repository
  structure, even though the internal handbook and files that link to it are
  excluded from that mirror.

## Related

- [AGENTS.md is the canonical AI instruction file](2026-02-20-agents-md-canonical-ai-instructions.md)
- [No internal product details in public-mirror content](2026-06-12-no-internal-product-details-public-mirror.md)

## Superseding this decision

When a later decision reverses this one, do not delete this file. Instead:

1. Change this file's Status to `Superseded by [new title](YYYY-MM-DD-new-slug.md)`.
2. Add a `> [!WARNING]` callout at the very top of this file pointing to the new
   record.
3. In the new record, add a `Supersedes:` line.

This keeps the decision history intact.
