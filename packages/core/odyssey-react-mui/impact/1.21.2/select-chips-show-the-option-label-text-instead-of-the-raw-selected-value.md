---
summary: Select chips show the option label text instead of the raw selected value
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: ca41f92d3
onlyRelevantIf: a multi-select Select whose options are objects with a text that differs from its value
---

Chips in a multi-select render normalizedOptionsMap.get(item)?.text instead of the raw selected value. Chips that previously showed the value now show the option label. A selected value with no matching option renders an empty chip, where it previously showed the value itself. Check chip widths and any selected value that can arrive from outside the options array.
