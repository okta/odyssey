---
summary: Tag delete icon lightens at rest, darkens less on hover
affectedExports:
  - Tag
  - TagList
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Tag or TagList with a remove affordance
---

The chip's delete icon got lighter at rest and darker on hover than before. Rest colour #6e6e6e to #8d8d8d, hover #272727 to #6e6e6e, so the resting icon is now lower contrast and the hover state never reaches full body colour. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:605-620; v1.0.0 components.tsx:746-761.
