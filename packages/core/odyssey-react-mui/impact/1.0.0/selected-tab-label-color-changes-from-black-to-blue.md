---
summary: Selected tab label color changes from black to blue
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Tabs with a selected tab, which is always
---

The selected tab's label changed from near-black to blue. It was `palette.text.primary` #272727, set twice, once on the `selected` ownerState branch and again in an `&.Mui-selected` block; the `&.Mui-selected` block was deleted and the surviving branch sets `TypographyColorAction` #4c64e1. The bold weight, 600, carried over. Since the hover colour is also #4c64e1, a selected tab and a hovered tab are now the same colour, where the selected one used to be distinctly darker. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1682-1684, 1708-1714; v1.0.0 components.tsx:1861-1864.
