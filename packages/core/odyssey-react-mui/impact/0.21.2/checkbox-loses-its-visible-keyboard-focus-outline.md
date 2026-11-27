---
summary: Checkbox loses its visible keyboard focus outline
affectedExports:
  - Checkbox
  - CheckboxGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: cebcca571
---

The .Mui-focusVisible outline was removed from MuiCheckbox and nothing replaced it in this release, so a keyboard-focused checkbox has no visible focus indicator on 0.21.2. A replacement box-shadow ring arrives in 0.21.3.
