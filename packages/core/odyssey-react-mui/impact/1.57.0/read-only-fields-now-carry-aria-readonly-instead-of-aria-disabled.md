---
summary: Read-only fields now carry `aria-readonly` instead of `aria-disabled`
affectedExports:
  - Autocomplete
  - DateField
  - DatePicker
  - DateTimeField
  - DateTimePicker
  - GroupPicker
  - PasswordField
  - Picker
  - PickerWithOptionAdornment
  - RadioGroup
  - SearchDropdown
  - Select
  - Switch
  - TextField
files:
  - packages/core/odyssey-react-mui/src/TextField.tsx
  - packages/core/odyssey-react-mui/src/PasswordField.tsx
  - packages/core/odyssey-react-mui/src/Select.tsx
  - packages/core/odyssey-react-mui/src/Switch.tsx
  - packages/core/odyssey-react-mui/src/Fields/Radio.tsx
  - packages/core/odyssey-react-mui/src/DatePickers/DateField.tsx
  - packages/core/odyssey-react-mui/src/useAutocomplete.tsx
  - packages/core/odyssey-react-mui/src/Autocomplete.tsx
  - packages/core/odyssey-react-mui/src/labs/DatePickers/DateTimeField.tsx
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/ComposablePicker.tsx
commit: 6674e6a1e
onlyRelevantIf: the consumer sets `isReadOnly` on a field, or has CSS or tests keyed on `aria-disabled` for read-only fields
---

Field inputs now carry `aria-readonly` when `isReadOnly` is passed, and Select carries `aria-readonly="false"` always because it is the only one that defaults the prop. At the same time Radio and Select stopped setting `aria-disabled` from `isReadOnly`, so a read-only field is no longer reported as disabled. Check accessibility snapshots, and check CSS or test locators that matched read-only fields through `aria-disabled`.
