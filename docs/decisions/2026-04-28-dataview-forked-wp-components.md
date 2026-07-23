# 2026-04-28 — DataView forked into wp-components, not shared from odyssey-react-mui

- **Status:** Accepted
- **Date:** 2026-04-28
- **Author:** Francois Lehoux
- **Source:** commit 26b7fa66016e095c9ca8a163474d37499b8749cc
- **Area:** architecture
- **Tags:** #architecture #dataview #wp-components

## Decision (the rule)

The wp-components version of DataView and DataFilters is a fork of the odyssey-react-mui
originals. wp-components owns its own copy and can diverge from core without gating on
odyssey-react-mui's release cycle.

## What was rejected

Having wp-components re-export DataView from odyssey-react-mui and accept the release coupling.
The natural assumption is that shared components should come from a single source of truth.
That is correct for stable, finalized components — but DataView was still accumulating
wp-specific requirements (prop sync effects, stale closure fixes, additional callbacks) that
were not ready to be part of the public API.

## Why

The wp-teams needed DataView changes faster than the odyssey-react-mui release cycle allows.
Forking gave them velocity without forcing immature API additions into core. The plan is to
promote the wp-fork back to core once the API stabilizes — the promote-contribution workflow
exists precisely for this pattern.

## How to honor it

- wp-components DataView bugs are fixed in `packages/contributions/wp-components`, not in
  `packages/core/odyssey-react-mui`.
- When the wp-fork API has stabilized, use the `contribution-promote` skill to merge it back
  into core.
- Do not add a re-export of `DataView` from odyssey-react-mui into wp-components — that would
  silently undo the fork.

## Related

- [Contributions packages use a shared stack, not isolated deps](2026-03-25-contributions-shared-stack.md)
- [contribution-promote skill drives the promotion workflow](2026-05-20-contribution-promote-skill.md)
