---
summary: Autocomplete empty-list text uses Odyssey's translation, not MUI's default
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/Autocomplete.tsx
commit: d7b0014ed
onlyRelevantIf: an Autocomplete with no noOptionsText and a locale other than English
---

When you pass no `noOptionsText`, Autocomplete now falls back to Odyssey's own translated string instead of letting MUI use its hardcoded English "No options". The empty-list text changes for every non-English locale, and its length changes with it.
