---
summary: Chip gains full theme styling and a default `CloseIcon`
affectedExports:
  - odysseyTheme
  - Chip
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 81fb77029
---

MuiChip gained a full theme override and a default deleteIcon of CloseIcon. Existing chips change height, padding, the theme's 4px border radius, and background, and a deletable chip's delete glyph changes. Check chip rows you sized by hand.
