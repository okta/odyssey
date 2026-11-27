---
summary: Picker options now keyed by label instead of position
affectedExports:
  - Picker
  - PickerWithOptionAdornment
files:
  - packages/odyssey-react-mui/src/labs/OdysseyPickers/Picker.tsx
  - packages/odyssey-react-mui/src/labs/OdysseyPickers/PickerWithOptionAdornment.tsx
  - packages/odyssey-react-mui/src/labs/OdysseyPickers/ComposablePicker.tsx
commit: 1be8dd38b
onlyRelevantIf: a labs Picker or PickerWithOptionAdornment is rendered
---

Rendered options gained a content-derived React key. `renderOption` now returns its option component wrapped in `<Fragment key={option.label}>` in both `Picker` and `PickerWithOptionAdornment`, where previously it returned the component with no key at all, so React reconciled the listbox by position. The `key={value}` calls removed from `Picker`'s internal `<Option>` elements never took effect, because a key on the single root element a component returns is not read for list reconciliation, and `PickerWithOptionAdornment` keeps its own `key={value}` on `<Option>` unchanged. Identity is now keyed on `option.label`, so two options that share a label collide where two options that shared a value would not. Check that adornments, descriptions and metadata stay attached to the right option when the list reorders, and check option sets with duplicate labels. The `Picker` and `PickerWithOptionAdornment` overload return types widened from `ReactElement` to `ReactNode`.
