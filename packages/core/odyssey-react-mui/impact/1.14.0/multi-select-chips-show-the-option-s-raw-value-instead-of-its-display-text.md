---
summary: Multi-select chips show the option's raw `value` instead of its display `text`
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: d59886ed3
---

Multi-select chips now carry the option's raw `value` string, where before they carried the option's `text`. Any option whose value differs from its display text now shows the value to the user. The chips are also rendered twice: once through `renderValue` and once through a new absolutely positioned overlay container, so a selector matching `.MuiChip-root` inside the field now matches two elements per selection.
