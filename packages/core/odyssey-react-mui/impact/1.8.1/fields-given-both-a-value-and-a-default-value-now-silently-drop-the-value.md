---
summary: Fields given both a value and a default value now silently drop the value
affectedExports:
  - Autocomplete
  - Checkbox
  - NativeSelect
  - PasswordField
  - RadioGroup
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/inputUtils.ts
  - packages/odyssey-react-mui/src/useControlledState.ts
  - packages/odyssey-react-mui/src/Autocomplete.tsx
  - packages/odyssey-react-mui/src/Checkbox.tsx
  - packages/odyssey-react-mui/src/NativeSelect.tsx
  - packages/odyssey-react-mui/src/PasswordField.tsx
  - packages/odyssey-react-mui/src/RadioGroup.tsx
  - packages/odyssey-react-mui/src/SearchField.tsx
  - packages/odyssey-react-mui/src/Select.tsx
  - packages/odyssey-react-mui/src/TextField.tsx
commit: 40dec732c
onlyRelevantIf: a form field given both a `value` (or `isChecked`) and a `defaultValue` (or `isDefaultChecked`), or one whose controlling value is absent on the first render
---

`useControlledState` was replaced by `getControlState`, which returns UNCONTROLLED whenever a default value is present, so passing both a value and a default now silently discards the value. The decision is still taken once on the first render and held in a ref. Each field now forwards exactly one of `value` or `defaultValue` to MUI, where several previously forwarded both. Check fields seeded from a default and then driven by state, and fields rendered before their data resolves.
