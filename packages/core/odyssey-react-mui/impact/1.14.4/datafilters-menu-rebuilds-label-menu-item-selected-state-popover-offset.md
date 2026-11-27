---
summary: "DataFilters menu rebuilds: label, menu item, selected state, popover offset"
affectedExports:
  - DataFilters
files:
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: efe2839f0
onlyRelevantIf: a DataFilters is rendered
---

The filter menu was rebuilt. Each filter's label moved from Odyssey's `Paragraph` (a `<div>`) to a raw MUI Typography at `font-weight: 500` with a Spacing2 bottom margin, so the element name and the visual weight both change. The menu item itself moved from Odyssey's MenuItem to a raw MUI MenuItem, the active filter now gets `.Mui-selected` and a new `.isVisiblySelected` class that paints a PalettePrimaryLighter background, and the filter popover gained `elevation={2}` plus a `marginLeft: 2, marginTop: -1` offset so it sits in a different place.
