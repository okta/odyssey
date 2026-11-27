---
summary: Grouped field `<legend>` now carries the id its `aria-labelledby` references
affectedExports:
  - CheckboxGroup
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/Field.tsx
commit: 11ab6eb42
onlyRelevantIf: a CheckboxGroup, RadioGroup, or any grouped field is rendered
---

A grouped field's `<legend>` now carries the id that CheckboxGroup and RadioGroup were already passing to `aria-labelledby`. Before this the reference pointed at no element, so the group had no accessible name from its legend. Screen reader output for grouped fields changes, and an accessibility audit that previously flagged a dangling `aria-labelledby` stops flagging it.
