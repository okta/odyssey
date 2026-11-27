---
summary: Removable tag's focus ring no longer requires the chip to be clickable
affectedExports:
  - Tag
  - TagList
files:
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: ac3112bd2
onlyRelevantIf: a removable Tag, which is focusable but not clickable
---

The chip focus ring is no longer gated on the chip being clickable, so a focusable but non-clickable chip now paints a focus background and outline. Check focus appearance on removable tags.
