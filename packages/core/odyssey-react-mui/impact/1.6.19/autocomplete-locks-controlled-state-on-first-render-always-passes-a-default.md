---
summary: Autocomplete locks controlled state on first render, always passes a default
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/Autocomplete.tsx
commit: 9585ccbc6
onlyRelevantIf: an Autocomplete whose `value` or `inputValue` is absent on the first render
---

Autocomplete now keeps its own copy of `value` and `inputValue` and, as with Checkbox at 1.6.17, fixes controlled versus uncontrolled on the first render. It also always passes a `defaultValue` to MUI, an empty array when `hasMultipleChoices` is set, alongside `value`, which MUI treats as a conflict. Check selections that are seeded asynchronously and any multi-choice Autocomplete that started from no selection.
