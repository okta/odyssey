---
summary: Select `data-se` moves off its root; options now get `.Mui-selected` styling
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: d59886ed3
onlyRelevantIf: a Select is rendered
---

Three changes to how Select renders. `data-se` was dropped from the MuiSelect root element and now appears only on the inner input, so a `[data-se]` selector aimed at the outer element stops matching. `displayEmpty` was removed, so a Select whose value is the empty string renders differently. Options now receive `selected`, which picks up the `.Mui-selected` theme rule, a transparent background with TypographyColorAction. The options were already MUI's MenuItem before this commit; the import is only aliased to `MuiMenuItem` here. A ListSubheader's text also gained a literal space on each side.
