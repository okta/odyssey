---
summary: "`TableSortLabel` loses its arrow icon default and hover-reveal styling"
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d0d8925e1
onlyRelevantIf: MUI's `TableSortLabel` is rendered directly rather than through Odyssey's table exports
---

MuiTableSortLabel lost its `IconComponent: ArrowDownIcon` default, so the icon is MUI's own arrow again, and its `opacity: 0` resting state, hover reveal, transition, alignment offsets, and active colour were all replaced by rules keyed on `.isUnsorted` and `.isSorted` classes that only the new DataTable applies. A hand-built sortable header falls back to MUI's own icon style, which already hides the arrow at rest and reveals it on hover, so the arrow stays hidden at rest. What changes is the hover reveal, which drops from Odyssey's opacity 1 to MUI's 0.5.
