---
summary: MenuItem gains selected highlight and a hidden check icon
affectedExports:
  - odysseyTheme
  - MenuItem
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8008ecb3f
---

MuiMenuItem was added to the theme. Its root justifies space-between, and a selected item takes a transparent background with the primary colour and a primary-lighter hover. Any SvgIcon inside a menu item is display: none unless the item is selected, which is how the check glyph on a selected option is shown and hidden.
