---
summary: Menu list gains padding, insetting items from the paper edge
affectedExports:
  - Select
  - MenuButton
  - MenuItem
  - MenuList
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: an open Select or MenuButton menu
---

A new `MuiMenu` block styles the menu list, which had no override before. `paddingBlock` and `paddingInline` are both `Spacing2` 0.571rem and `borderRadius` is `BorderRadiusMain` 6px, where MUI's MenuList default is 8px block padding and zero inline padding. Menu items are now inset from the paper edge on all four sides, so full-bleed hover and selected backgrounds no longer reach the menu border. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. No `MuiMenu` block at v0.24.0; v1.0.0 components.tsx:1585-1593.
