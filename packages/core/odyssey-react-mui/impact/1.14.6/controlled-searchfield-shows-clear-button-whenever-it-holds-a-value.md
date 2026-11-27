---
summary: Controlled SearchField shows clear button whenever it holds a value
affectedExports:
  - SearchField
files:
  - packages/odyssey-react-mui/src/SearchField.tsx
commit: 16aea14da
onlyRelevantIf: a SearchField is controlled through its value prop
---

The clear button's render condition widened from `defaultValue` alone to `defaultValue || value`. A controlled SearchField now shows a clear button whenever it holds a value, where before it showed none. Check layouts that allowed no room for the trailing button.
