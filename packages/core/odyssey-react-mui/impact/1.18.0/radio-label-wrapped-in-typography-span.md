---
summary: Radio label wrapped in Typography span
affectedExports:
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/Radio.tsx
commit: cf402a63e
onlyRelevantIf: a Radio is rendered
---

A Radio's label text is now wrapped in `<Typography component="span">`, the same shape Checkbox took at 1.15.4, so a `MuiTypography-root` span appears between the label and its text.
