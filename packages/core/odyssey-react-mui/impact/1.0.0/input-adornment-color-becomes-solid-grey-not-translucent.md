---
summary: Input adornment color becomes solid grey, not translucent
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - InputAdornment
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a field with a leading or trailing adornment
---

Adornment colour went from `palette.action.active` `rgba(0, 0, 0, 0.54)` to `TypographyColorSubordinate` #6e6e6e. On white these are close, but the old value was translucent, so an adornment over a tinted or read-only field fill previously picked up that fill and now does not. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1209; v1.0.0 components.tsx:1350.
