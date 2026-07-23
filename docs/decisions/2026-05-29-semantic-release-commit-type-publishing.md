# 2026-05-29 — Commit type controls publishing for Semantic Release packages

- **Status:** Accepted
- **Date:** 2026-05-29
- **Author:** Ricardo Joenck
- **Source:** commit 4d91cd3a191d19109c538c485c2500ca837e9177 ("unified-ui-shell publish workaround #341")
- **Area:** process
- **Tags:** #process #release

## Decision (the rule)

For packages under `packages/contributions/**` and `packages/platform/**` (managed by
Semantic Release, configured in `.config/releaserc.json`), the **merge-commit type controls
whether a new version publishes**: `feat:` → minor, `fix:` → patch, `BREAKING CHANGE` footer
→ major. `build:`, `docs:`, `test:`, `style:`, `perf:`, `refactor:` do **not** publish. When a
change must ship but doesn't fit `feat:`, use `fix:` — it is the minimum publish trigger.

## What was rejected

Treating the Conventional Commits type as purely cosmetic / for changelog grouping. The
natural assumption is that commit type is a label and the release happens on merge regardless.
Under Semantic Release it is load-bearing: a genuinely shippable change committed as `build:`
or `docs:` silently produces **no release**, and the fix never reaches consumers.

## Why

This bit us on unified-ui-shell: a change that needed to publish was typed as a non-releasing
type and no version was cut, requiring a follow-up "publish workaround" commit. Encoding the
type→publish mapping as an explicit decision prevents the silent no-op.

## How to honor it

- Before merging a change to a Semantic Release package, ask: does this need to publish?
  If yes, the merge commit must be `feat:` or `fix:` (or carry a `BREAKING CHANGE` footer).
- Never use `build:`/`docs:` when the goal is to ship a new version of these packages.
- Core packages (`odyssey-react-mui` etc.) use manual version bumps, not Semantic Release —
  this rule is specific to `contributions/**` and `platform/**`.

## Related

- [odyssey-cli owns contribution sync and promotion](2026-04-23-odyssey-cli-contribution-sync.md)
