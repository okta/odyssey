---
summary: Secondary button becomes filled blue, loses its border
affectedExports:
  - Button
  - MenuButton
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Button with variant secondary
---

The secondary button was redrawn from a bordered grey chip into a filled blue one, and it lost its border. Fill #f4f4f4 to #dbe0fa, label #272727 to #2e40a5, hover fill #f2f3fd to #c1c9f6 with label #4c64e1 to #22307c, active gained a #9daaf1 fill where it previously only changed the border, and disabled label #8d8d8d to #aeaeae. The `borderColor` declarations on rest, hover, active, and disabled are all gone, and the root's new `borderColor: transparent` applies instead, so the 1px #e1e1e1 outline disappears while the border box keeps its width. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:251-272; v1.0.0 components.tsx:327, 372-390.
