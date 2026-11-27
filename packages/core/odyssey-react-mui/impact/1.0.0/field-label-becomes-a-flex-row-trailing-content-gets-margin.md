---
summary: Field label becomes a flex row; trailing content gets margin
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Autocomplete
  - Fieldset
  - Checkbox
  - Radio
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a field label, especially one with trailing content such as an optional marker
---

The field label became a flex container. It gained `display: "inline-flex"` and `alignItems: "center"`, where it previously laid out as a block-level label, so its children now sit on one baseline-centred row and the label box shrinks to its content. A new `& > .MuiTypography-root` rule adds `marginInlineStart: Spacing1` 0.286rem to trailing label content. That rule's companion declaration, `margin: "reset"`, is not a valid CSS value and is dropped by the browser. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1144-1153; v1.0.0 components.tsx:1311-1326.
