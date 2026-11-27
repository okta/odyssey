---
summary: Select default variant changes from outlined to standard
affectedExports:
  - odysseyTheme
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ba06723a0
---

MuiSelect and MuiNativeSelect now default their variant to "standard" where they previously defaulted to "outlined". The rendered wrapper, its class names and its geometry all change, and MuiInput gained disableUnderline: true so the standard variant draws no underline. Check selects you styled by targeting the outlined classes.
