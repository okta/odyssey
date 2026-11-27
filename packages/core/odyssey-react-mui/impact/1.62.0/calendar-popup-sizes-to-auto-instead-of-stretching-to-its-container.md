---
summary: Calendar popup sizes to `auto` instead of stretching to its container
affectedExports:
  - DatePicker
  - DateTimePicker
files:
  - packages/core/odyssey-react-mui/src/DatePickers/datePickerTheme.tsx
commit: 7f91aaf4b
---

The calendar popup content stopped stretching to its container and now sizes to `auto`. Check calendar width, especially inside narrow containers where it previously overflowed.
