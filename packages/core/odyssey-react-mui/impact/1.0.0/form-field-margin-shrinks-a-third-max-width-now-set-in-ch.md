---
summary: Form field margin shrinks a third; max-width now set in `ch`
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Autocomplete
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
  - Fieldset
  - Form
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
---

The gap between stacked form fields shrank by a third. `MuiFormControl` has `margin: "normal"` as its default prop, and that branch's `marginBottom` went from `theme.spacing(5)` 1.714rem to `Spacing4` 1.143rem. The `dense` branch was left at 1.714rem, so `normal` and `dense` now differ where they used to be identical. Every stacked form gets shorter. The field's `maxWidth` also moved from the hardcoded string `"32rem"` to `TypographyLineLengthMax`, which is `55ch` at v1.0.0, so field width now tracks the rendered font rather than the root size. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1048-1068; v1.0.0 components.tsx:1219-1239.
