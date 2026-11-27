---
summary: Drawer header margin reset narrows to direct children; footer buttons now wrap
affectedExports:
  - Drawer
files:
  - packages/core/odyssey-react-mui/src/Drawer.tsx
commit: 5dedf14be
---

The drawer header's margin reset moved from a descendant rule on fifth-level headings to a direct-child rule on the typography class, so it now reaches any heading level but only direct children. The title can also shrink instead of pushing the close button out, the close button no longer shrinks, and footer buttons now wrap onto a second row with vertical spacing instead of overflowing. Check header and footer layout with long titles and several footer actions.
