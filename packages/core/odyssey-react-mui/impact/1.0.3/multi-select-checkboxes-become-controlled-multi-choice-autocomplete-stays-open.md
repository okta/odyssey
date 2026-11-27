---
summary: Multi-select checkboxes become controlled; multi-choice Autocomplete stays open
affectedExports:
  - Select
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/Select.tsx
  - packages/odyssey-react-mui/src/Autocomplete.tsx
commit: 1bffb3bca
onlyRelevantIf: a multi-select Select, or an Autocomplete with hasMultipleChoices
---

A multi-select Select's option checkboxes changed from the Odyssey Checkbox (uncontrolled, via isDefaultChecked) to a raw MuiCheckbox driven by checked, so they now track the selection instead of only its initial state, and they lose the FormControlLabel wrapper. A multi-choice Autocomplete gained disableCloseOnSelect, so its dropdown stays open after each pick.
