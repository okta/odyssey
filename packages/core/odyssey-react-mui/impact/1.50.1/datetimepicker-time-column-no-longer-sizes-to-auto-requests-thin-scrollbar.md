---
summary: DateTimePicker time column no longer sizes to auto, requests thin scrollbar
affectedExports:
  - DateTimePicker
files:
  - packages/core/odyssey-react-mui/src/labs/DatePickers/dateTimePickerTheme.ts
commit: 50fdc1001
onlyRelevantIf: a DateTimePicker or time picker, and impact depends on the consumer's platform scrollbar rendering
---

The time picker column stopped sizing itself to `auto` and now requests a thin scrollbar, so the column no longer widens to accommodate one. Check time picker column width and alignment on platforms that reserve scrollbar space.
