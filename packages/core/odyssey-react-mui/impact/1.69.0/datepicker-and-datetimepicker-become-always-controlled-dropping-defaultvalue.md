---
summary: DatePicker and DateTimePicker become always controlled, dropping `defaultValue`
affectedExports:
  - DatePicker
  - DateTimePicker
files:
  - packages/core/odyssey-react-mui/src/DatePickers/useOdysseyDateFields.ts
  - packages/core/odyssey-react-mui/src/DatePickers/DatePicker.tsx
  - packages/core/odyssey-react-mui/src/labs/DatePickers/DateTimePicker.tsx
commit: 9f9d1e844
onlyRelevantIf: a DatePicker or DateTimePicker. Impact depends on whether the consumer passes `value`, `defaultValue`, or both
---

The picker is now always controlled and no longer passes `defaultValue` through at all. Two behaviors change: a `value` arriving after mount now reaches a field that mounted with only a `defaultValue`, and an empty or unparsable `value` now clears the field where the last typed text previously survived. A later change to `defaultValue` is still ignored, as it was before, because MUI captures `defaultValue` while it mounts and never reads it again. Check fields that seed from a default and update later, and check what a field shows when given an invalid value.
