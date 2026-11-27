---
summary: Indeterminate checkbox now shares checked styling instead of rendering unfilled
affectedExports:
  - Checkbox
  - CheckboxGroup
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: efe2839f0
onlyRelevantIf: a Checkbox can be indeterminate
---

The `.MuiCheckbox-indeterminate` state now shares the checked styling: PalettePrimaryMain background and border. An indeterminate checkbox was previously unfilled. This also reaches a DataTable's select-all checkbox.
