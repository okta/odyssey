---
summary: Tag renders a styled wrapper instead of a bare MuiChip
affectedExports:
  - Tag
  - TagList
files:
  - packages/odyssey-react-mui/src/Tag.tsx
commit: 8d9c36a84
onlyRelevantIf: MuiChip is overridden in the consumer's own themeOverride
---

Tag stopped rendering a bare MuiChip and now renders an Emotion styled wrapper that sets backgroundColor, color and borderColor itself. The default variant's values match the theme's previous MuiChip values exactly, HueNeutral100, HueNeutral700 and HueNeutral200, so an unmodified Tag looks the same. A consumer override on MuiChip now loses to the styled component's higher specificity. Check custom Tag or Chip theming.
