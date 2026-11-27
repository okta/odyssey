---
summary: Picker popup spacing changes across the day, month, and year views
affectedExports:
  - DatePicker
  - DateTimePicker
files:
  - packages/core/odyssey-react-mui/src/DatePickers/datePickerTheme.tsx
  - packages/core/odyssey-react-mui/src/labs/DatePickers/DateTimePicker.tsx
  - packages/core/odyssey-react-mui/src/labs/DatePickers/dateTimePickerTheme.ts
commit: 026a18c0c
onlyRelevantIf: a DatePicker or DateTimePicker
---

The picker popup moves its padding from the outer wrapper into each calendar view, and the month view gets its own padding and button size. The calendar height is now `auto` instead of a fixed 336 pixels, the content clips to the rounded border, and the DateTimePicker popup grows from 486 to 534 pixels wide. The time list keeps the 336 pixel maximum height. Check the popup size and position near the edge of the viewport, and visual baselines of an open picker.
