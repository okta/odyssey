---
summary: Button focus ring color changes; focus no longer darkens the fill
affectedExports:
  - Button
  - MenuButton
  - Dialog
  - Toast
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a keyboard user reaching a Button
---

The focus ring colour changed and focus no longer tints the button. The two-layer `focus-visible` box shadow's outer colour went from `palette.primary.main` #4c64e1 to `PalettePrimaryMain` #546be7, and for the danger variant from #d92300 to #e72500. Separately, `&:hover, &:focus-visible` was split into `&:hover` alone on the primary, secondary, and floating variants, and the danger variant's `focus-visible` no longer sets `backgroundColor: palette.error.dark`. Keyboard focus now shows only the ring, where it previously also darkened the fill. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:235-237, 256-260, 284-287, 306-309, 385; v1.0.0 components.tsx:339, 358, 376, 420-422, 437.
