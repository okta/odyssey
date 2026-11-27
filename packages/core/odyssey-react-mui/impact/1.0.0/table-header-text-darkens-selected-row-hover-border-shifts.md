---
summary: Table header text darkens; selected-row hover border shifts
affectedExports:
  - OdysseyProvider
  - ThemeProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
---

Table header text darkened and the selected-row hover rule changed colour. The `.MuiTableHead-root &` descendant rule's `color` went from `palette.text.secondary` #6e6e6e to `TypographyColorBody` #272727, so header cells now match body cells and no longer read as subordinate; only the 600 weight and the #f4f4f4 fill distinguish them. The border under a hovered selected row went #4c64e1 to #546be7. This reaches a consumer's own `@mui/material` Table, because Odyssey exports no Table component at v1.0.0. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1790-1792, 1812-1817; v1.0.0 components.tsx:1964-1966, 1986-1991.
