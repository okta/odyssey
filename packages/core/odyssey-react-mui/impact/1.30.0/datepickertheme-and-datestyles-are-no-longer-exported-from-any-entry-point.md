---
summary: "`datePickerTheme` and `dateStyles` are no longer exported from any entry point"
affectedExports:
  - DatePicker
files:
  - packages/odyssey-react-mui/src/labs/DatePickers/index.ts
  - packages/odyssey-react-mui/src/DatePickers/index.ts
  - packages/odyssey-react-mui/src/index.ts
commit: e8d53ca9c
onlyRelevantIf: datePickerTheme or dateStyles is imported from @okta/odyssey-react-mui/labs
---

datePickerTheme and dateStyles stop being reachable from any public entry point, and there is no path they move to. The DatePicker source moved from src/labs/DatePickers/ to src/DatePickers/. The labs barrel still has export * from "./DatePickers", but that resolves to src/labs/DatePickers/index.ts, which was cut down to export * from "./DateTimePicker" only. The new root-level src/DatePickers/index.ts does export datePickerTheme, but the main barrel pulls only a named { DatePicker, type DatePickerProps } from it, so the theme fragment is not re-exported anywhere. This is a build-visible break with nothing for the consumer to edit: no public specifier exports either name at this version, so no codemod can rewrite the import. datePickerTheme had been public continuously from before 1.18.0 through 1.29.0; dateStyles was public only in 1.29.0.
