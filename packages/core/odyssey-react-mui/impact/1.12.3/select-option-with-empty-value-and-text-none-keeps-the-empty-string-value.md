---
summary: Select option with empty `value` and text "None" keeps the empty string value
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: bad9607d6
---

An option written as `{ text: "None", value: "" }` used to be normalized to `value: "None"`, because the empty string fell through to the option text. It now keeps the empty string, so the value the Select reports for that option changes. The Select also sets MUI's `displayEmpty` whenever `value` or `defaultValue` is the empty string, which changes whether the collapsed field shows an empty selection or falls back to the label placeholder.
