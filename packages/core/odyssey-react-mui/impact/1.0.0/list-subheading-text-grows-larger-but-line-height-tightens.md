---
summary: List subheading text grows larger but line-height tightens
affectedExports:
  - Select
  - NativeSelect
  - MenuButton
  - ListSubheader
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a grouped Select or a MenuButton with section headings
---

List subheadings got larger and much tighter. `fontSize` went from `theme.typography.caption.fontSize`, MUI's own 0.75rem since the theme defines no `caption` variant, to `TypographySizeSubordinate` 0.857rem. `lineHeight` went from `caption.lineHeight` 1.66 to `TypographyLineHeightUi` 1.2, so a subheading's line box shrinks from about 1.25rem to about 1.03rem even as the glyphs grow. Re-measure grouped menus. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1421-1429; v1.0.0 components.tsx:1574-1582.
