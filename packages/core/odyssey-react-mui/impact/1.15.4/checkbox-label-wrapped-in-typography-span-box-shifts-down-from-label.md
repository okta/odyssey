---
summary: Checkbox label wrapped in Typography span, box shifts down from label
affectedExports:
  - Checkbox
  - CheckboxGroup
files:
  - packages/odyssey-react-mui/src/Checkbox.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 6dba68917
onlyRelevantIf: a Checkbox is rendered
---

Two changes together. The label text is now wrapped in `<Typography component="span">`, so a `MuiTypography-root` span appears between the label element and the text, which affects a CSS rule or a text query aimed at the label's direct child. Separately, the theme rule that forced `margin-block-start: 0` on a checkbox inside a FormControlLabel was removed, so Checkbox's own 2px top margin now applies and the box shifts down relative to its label.
