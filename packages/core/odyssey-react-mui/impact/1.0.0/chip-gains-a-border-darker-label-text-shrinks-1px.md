---
summary: Chip gains a border, darker label text, shrinks 1px
affectedExports:
  - Status
  - Tag
  - TagList
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Status, Tag, TagList, or a multi-choice Select that renders chips
---

The chip gained a border and a darker label, and lost a pixel of height. New on the root: `borderWidth: BorderWidthMain` 1px, `borderStyle` solid, `borderColor: HueNeutral200` #e1e1e1, and `color: HueNeutral700` #4b4b4b where the label previously inherited #272727. `paddingBlock` went from `theme.spacing(2)` 0.571rem to `calc(Spacing2 - BorderWidthMain)`, so the content box shrinks by 1px while the border box holds. A new `& .MuiChip-icon` rule sets `margin: 0` and `marginInlineEnd: Spacing1` 0.286rem, replacing MUI's own icon margins. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:524-535; v1.0.0 components.tsx:601-645.
