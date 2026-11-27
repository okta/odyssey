---
summary: Checkbox and Radio controls gain a `min-width` equal to their height
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c510f4075
onlyRelevantIf: a Checkbox or Radio sits in a flex or grid context, or carries a long label
---

The Checkbox and Radio controls gained a `min-width` equal to their height, so the box or circle no longer shrinks when the label competes for space. Check rows where the control had been squashed, and check the multi-choice Select, whose option checkboxes take the same override.
