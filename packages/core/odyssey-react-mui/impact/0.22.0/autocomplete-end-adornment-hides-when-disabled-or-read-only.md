---
summary: Autocomplete end adornment hides when disabled or read-only
affectedExports:
  - Autocomplete
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 606618cef
---

MuiAutocomplete gained styleOverrides for clearIndicator, endAdornment and popupIndicator. The end adornment becomes a flex row with a Spacing1 gap, is repositioned against the field's inline end, and is hidden outright when the field is disabled or read-only.
