---
summary: Autocomplete and Select chips truncate past a max width instead of widening
affectedExports:
  - Autocomplete
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 28b3a12a0
onlyRelevantIf: a multi-select Autocomplete, Select, or any input rendering chips
---

Two maxWidth rules were added for chips. MuiAutocomplete's inputRoot caps a chip at calc(TypographyLineLengthMax - (Spacing6 + Spacing6 + Spacing1)), leaving room for the container's inline-end padding and the clear button. MuiFormControl's root caps it at calc(TypographyLineLengthMax - Spacing6), leaving room for the padding only. A chip whose label exceeds its cap truncates instead of widening the control. Check long selected values in multi-selects.
