---
summary: "`data-se` moves from each field's outer element onto its inner input control"
affectedExports:
  - TextField
  - PasswordField
  - Select
  - NativeSelect
  - Checkbox
  - Radio
  - Autocomplete
  - Switch
  - VirtualizedAutocomplete
files:
  - packages/odyssey-react-mui/src/TextField.tsx
  - packages/odyssey-react-mui/src/PasswordField.tsx
  - packages/odyssey-react-mui/src/Select.tsx
  - packages/odyssey-react-mui/src/NativeSelect.tsx
  - packages/odyssey-react-mui/src/Checkbox.tsx
  - packages/odyssey-react-mui/src/Radio.tsx
  - packages/odyssey-react-mui/src/Autocomplete.tsx
  - packages/odyssey-react-mui/src/labs/Switch.tsx
  - packages/odyssey-react-mui/src/labs/VirtualizedAutocomplete.tsx
commit: c1cb4029b
onlyRelevantIf: elements are located by the data-se attribute that testId sets
---

data-se moved off each component's outer element and onto the inner input, select, or control element, by way of inputProps. The consumer's source is unchanged and still passes testId, but every selector resolves to a different node: what used to be a wrapper is now the form control itself. Selectors still match, so a Selenium or Playwright suite fails on the interaction or the assertion rather than on the lookup. Check every data-se selector aimed at these nine components, especially ones that then read text content or click a label.
