---
summary: Autocomplete gains autoHighlight, selectOnFocus, and more defaults
affectedExports:
  - Autocomplete
  - odysseyTheme
  - OdysseyThemeProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 90e6a170e
---

MuiAutocomplete gained defaultProps: sixteen in 90e6a170e and includeInputInList in 3be3b4759, seventeen by the time 0.22.0 ships. They include autoHighlight: true, selectOnFocus: true, handleHomeEndKeys: true, clearOnEscape: true, limitTags: -1, and CloseIcon and ChevronDownIcon as the clear and popup icons. MUI's Autocomplete rendered under the Odyssey theme picks all of them up without the consumer changing any code.
