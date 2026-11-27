---
summary: Fields now emit `aria-labelledby` and `aria-errormessage` on the input itself
affectedExports:
  - TextField
  - PasswordField
  - Select
  - NativeSelect
  - Autocomplete
  - CheckboxGroup
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/Field.tsx
  - packages/odyssey-react-mui/src/TextField.tsx
  - packages/odyssey-react-mui/src/PasswordField.tsx
  - packages/odyssey-react-mui/src/Select.tsx
  - packages/odyssey-react-mui/src/NativeSelect.tsx
  - packages/odyssey-react-mui/src/Autocomplete.tsx
  - packages/odyssey-react-mui/src/CheckboxGroup.tsx
  - packages/odyssey-react-mui/src/RadioGroup.tsx
commit: 680e760ba
---

Every field now emits aria-labelledby pointing at its label element and aria-errormessage pointing at its error element, on the input itself. aria-labelledby takes precedence over the <label for> association, so a field whose accessible name came from anywhere else, including an app-supplied aria-label, is now named by Odyssey's label element instead. Select's labelId was also fixed here: it had been set to the label text rather than the label element's id, so it pointed at nothing, and it now points at the real id.
