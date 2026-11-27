---
summary: Checkbox and Radio label spacing moves from margin to gap
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Checkbox or Radio with labelPlacement top or bottom
---

Control-to-label spacing moved from a margin on the label to a gap on the row, which changes the vertical placements. The label slot's `&:not(:first-child) { marginInlineStart: theme.spacing(2) }` was deleted and the root gained `gap: Spacing2` 0.571rem. Both are 0.571rem, so the default horizontal placement is unchanged, but `top` and `bottom` placements previously received an inline-start margin and now receive a block gap instead, which is the correct axis and a visible difference. The label slot's replacement `gap: Spacing1` has no effect, because the label is a non-flex span. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1073-1115; v1.0.0 components.tsx:1244-1282.
