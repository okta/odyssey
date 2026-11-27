---
summary: Disabled chip label lightens; focus ring loses its offset
affectedExports:
  - Status
  - Tag
  - TagList
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a disabled Tag, or a clickable chip reached by keyboard
---

A disabled chip's label went #6e6e6e to #aeaeae, a noticeable drop in contrast. A clickable chip's focus ring lost its offset: `outlineOffset` went from a hardcoded 2px to `FocusOutlineOffsetTight` 0, so the ring now sits flush against the chip edge instead of 2px clear of it, and its colour went #4c64e1 to #546be7. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:537-559; v1.0.0 components.tsx:618-640.
