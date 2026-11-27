---
summary: Disabled control label darkens, disabled hint lightens
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
  - Switch
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e3476db2a
onlyRelevantIf: a disabled Checkbox, Radio or Switch, and any of those carrying a `hint`
---

A disabled form control's label and hint now render in `TypographyColorDisabled` #aeaeae, the label rule marked `!important`, and a disabled hint's links go grey too. The label was already grey: MUI's `FormControlLabel` root carries `& .MuiFormControlLabel-label.Mui-disabled { color: palette.text.disabled }`, which the Odyssey theme resolved to `HueNeutral300` #cbcbcb, and that selector outranks the theme's `label` slot, which is why the new rule needs `!important`. The label therefore darkens from #cbcbcb to #aeaeae. The hint moves the other way. `MuiFormHelperText` gains a `.Mui-disabled &` rule, which matches a hint nested inside a disabled `FormControlLabel`, so a standalone disabled Checkbox, Radio or Switch hint lightens from MUI's base `palette.text.secondary` #6e6e6e to #aeaeae, and a link inside it drops `TypographyColorAction` #4c64e1 for #aeaeae. A group-level hint on CheckboxGroup or RadioGroup is a sibling of the FormLabel rather than a descendant, so it is unaffected. `MuiFormControlLabel`'s `&.Mui-disabled` block, previously only `pointerEvents: "none"`, also gains `color: TypographyColorDisabled`, which sets the inherited colour for anything in the row with no rule of its own. Check contrast on disabled fields and any consumer rule that was setting the disabled label colour itself, which the `!important` now outranks.
