---
summary: Selected MenuItem turns bold, focus ring replaces focus background
affectedExports:
  - MenuItem
  - MenuButton
  - Select
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 79d4763ca
---

Two changes to menus and option lists. A selected MenuItem is now TypographyWeightBodyBold, where it was regular weight. A focus-visible MenuItem and a focus-visible Autocomplete option get theme.mixins.insetFocusRing with a transparent background instead of the previous background-only treatment.
