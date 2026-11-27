---
summary: DatePicker rewritten with a new theme, calendar and input render differently
affectedExports:
  - DatePicker
  - datePickerTheme
files:
  - packages/odyssey-react-mui/src/labs/DatePicker.tsx
  - packages/odyssey-react-mui/src/labs/datePickerTheme.tsx
commit: 92ba4cf9b
onlyRelevantIf: a labs DatePicker is rendered
---

DatePicker was rewritten and its 202-line theme went with it. Beyond the prop changes listed under codemod candidates, the calendar and the input render differently and `datePickerTheme`, which consumers merge into their own theme, is substantially different. Check the calendar's appearance and any theme a consumer composed on top of the old one.
