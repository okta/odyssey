---
summary: Dialog content loses vertical padding unless dividers are set
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Dialog, especially one without dividers
---

Dialog content lost its vertical padding unless dividers are on. `paddingBlock` was an unconditional `theme.spacing(4)` 1.143rem; it is now 0, raised to `Spacing6` 2.286rem only when `dividers` is `true`, which also newly tints the content #6e6e6e. The `&:last-child` block-end padding of 2.286rem is unchanged, so a dialog with no footer keeps its bottom gutter but loses its top one. The `dividers === false` rule that gave a following DialogActions a smaller 1.143rem top padding was deleted outright. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:994-1008; v1.0.0 components.tsx:1163-1175.
