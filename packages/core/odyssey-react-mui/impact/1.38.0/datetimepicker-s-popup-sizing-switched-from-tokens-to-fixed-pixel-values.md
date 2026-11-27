---
summary: DateTimePicker's popup sizing switched from tokens to fixed pixel values
affectedExports:
  - DateTimePicker
files:
  - packages/odyssey-react-mui/src/labs/DatePickers/DateTimePicker.tsx
  - packages/odyssey-react-mui/src/labs/DatePickers/dateTimePickerTheme.ts
commit: "514338e64"
onlyRelevantIf: the labs DateTimePicker
---

The picker's sizing moved off design tokens onto fixed pixel-derived rem values: the container's max width went from `TypographyLineLengthMax` to 486/14rem, the calendar got a fixed 336/14rem height and max-height, the day-calendar slide transition a 240/14rem min-height, and the digital clock sections a matching max-height applied through a specificity override. The popup's footprint is now fixed rather than following the type scale, so check layouts sized around the old width.
