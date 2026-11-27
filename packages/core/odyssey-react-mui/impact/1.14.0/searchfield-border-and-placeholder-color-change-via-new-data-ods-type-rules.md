---
summary: SearchField border and placeholder color change via new `data-ods-type` rules
affectedExports:
  - SearchField
files:
  - packages/odyssey-react-mui/src/SearchField.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d59886ed3
onlyRelevantIf: a SearchField is rendered
---

SearchField now stamps `data-ods-type="search"` and `data-ods-variant` on its InputBase root, and new theme rules key off them. Every existing SearchField changes border color to HueNeutral400 and placeholder color to TypographyColorSupport at opacity 1, with no prop change on the consumer's side.
