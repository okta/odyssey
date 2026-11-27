---
summary: Placeholder text color changes to support color; start adornment margin grows
affectedExports:
  - Autocomplete
  - NativeSelect
  - PasswordField
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d59886ed3
---

Placeholder text in every input moved from TypographyColorSubordinate to TypographyColorSupport, and a start adornment's `margin-inline-start` moved from Spacing2 to Spacing3. Check inputs with a leading icon and inputs whose placeholder contrast was already marginal.
