---
summary: Field error text wraps in a `div` instead of sitting as a bare text node
affectedExports:
  - TextField
  - PasswordField
  - Select
  - NativeSelect
  - Autocomplete
  - CheckboxGroup
  - RadioGroup
  - VirtualizedAutocomplete
files:
  - packages/odyssey-react-mui/src/FieldError.tsx
  - packages/odyssey-react-mui/src/ErrorMessageList.tsx
  - packages/odyssey-react-mui/src/Field.tsx
commit: ee53f9883
onlyRelevantIf: a field's error text is located by CSS or by a DOM query rather than by accessible name
---

The error message used to be a text node directly inside the MuiFormHelperText element. It is now wrapped in a div. The helper text element has display: flex, so the message becomes a block-level flex item rather than an anonymous one. The id and the aria wiring are unchanged. Check selectors of the form .MuiFormHelperText-root > * , first-child rules, and any assertion on the helper text's own textContent structure.
