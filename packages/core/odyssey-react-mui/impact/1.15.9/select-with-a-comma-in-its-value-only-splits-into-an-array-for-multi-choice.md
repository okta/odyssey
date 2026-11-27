---
summary: Select with a comma in its value only splits into an array for multi-choice
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: bd941efd5
onlyRelevantIf: a single-choice Select has option values containing a comma
---

The change handler split a string value on commas regardless of `hasMultipleChoices`, so a single-select whose selected value contained a comma had it turned into an array before reaching the consumer's state. The split is now gated on multiple choices. Check any handler that was compensating for the array.
