---
summary: Gap between stacked Callouts doubles
affectedExports:
  - Callout
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: stacked Callouts, formerly the Infobox variant
---

The gap between consecutive callouts doubled. The `infobox` variant's `&:not(:last-child)` margin-bottom was `theme.spacing(4)` 1.143rem; the `callout` variant that replaced it uses `Spacing6` 2.286rem. Its corner radius also moved 4px to 6px. Check any vertical rhythm built on a run of infoboxes. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:70-77; v1.0.0 components.tsx:140-145.
