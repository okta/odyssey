---
summary: Disabled Tag label and icon color now varies by colorVariant
affectedExports:
  - Tag
  - TagList
files:
  - packages/odyssey-react-mui/src/Tag.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 6d87e88c6
onlyRelevantIf: a disabled Tag
---

Tag's styled wrapper now sets its own per-variant textDisabled and iconDisabled colors, taken from the variant's own hue rather than the theme's TypographyColorDisabled. A disabled Tag's label and leading icon are a different color than before, and the color depends on colorVariant.
