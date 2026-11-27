---
summary: "`palette.text.disabled` darkens to neutral 600"
affectedExports:
  - TextField
  - PasswordInput
  - MenuItem
  - MenuButton
  - Tab
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/theme/palette.ts
commit: 1c43a5d64
---

palette.text.disabled moved from ColorPaletteNeutral500 to ColorPaletteNeutral600, darkening disabled input text, disabled menu items and disabled tabs. Check any contrast baseline or screenshot that pinned the old value.
