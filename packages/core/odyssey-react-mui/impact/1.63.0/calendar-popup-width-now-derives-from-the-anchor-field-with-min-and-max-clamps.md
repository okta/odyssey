---
summary: Calendar popup width now derives from the anchor field, with min and max clamps
affectedExports:
  - DatePicker
  - DateTimePicker
files:
  - packages/core/odyssey-react-mui/src/DatePickers/datePickerTheme.tsx
commit: d8eb6b8bf
onlyRelevantIf: impact depends on the consumer's field width, container width, viewport, and pointer type
---

The calendar popup now takes its width from the anchor field through a positioning modifier that writes an inline width, with new minimum and maximum clamps, and the layout root's full-viewport width is now overridden for fine pointers. Check calendar width and position across field widths, viewport sizes, and touch versus mouse.
