---
summary: Multi-select with `hasMultipleChoices`, no value, starts as a string, not array
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: 70bdab3b3
---

Select's initial internal value is still chosen from the deprecated isMultiSelect prop, not from hasMultipleChoices. A multi-select declared with hasMultipleChoices and no value starts at the empty string rather than an empty array, so the option checkboxes call String.prototype.includes against a string and match on substrings. Using isMultiSelect, or supplying value, avoids it. isMultiSelect also lost its = false default, so multiple is now passed as undefined rather than false when neither prop is given.
