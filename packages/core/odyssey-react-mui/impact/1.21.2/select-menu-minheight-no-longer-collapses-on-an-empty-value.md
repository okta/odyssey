---
summary: Select menu minHeight no longer collapses on an empty value
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/Select.tsx
commit: d8726017b
---

The MuiSelect select slot's minHeight went from 0 to TypographyLineHeightUi em, so a Select holding an empty value no longer collapses. Separately, Select stamps data-empty on option items with no text and the theme gives those a hidden ::after so they keep a full row height. Check forms whose vertical rhythm depended on an empty Select being shorter, and menus that listed blank options.
