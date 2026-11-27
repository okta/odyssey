---
summary: DatePicker input stretches to fill its container instead of a fixed width
affectedExports:
  - DatePicker
files:
  - packages/odyssey-react-mui/src/labs/DatePicker.tsx
commit: 44b3ef8da
onlyRelevantIf: the labs DatePicker is rendered inside a container wider than its old fixed width
---

The DatePicker input's width went from a fixed 176/14 rem to width: 100% capped at TypographyLineLengthMax, which is 55ch. The field now grows to fill its container. Its wrapper also lost display: flex. Check forms that placed the date field beside other controls and relied on its fixed width.
