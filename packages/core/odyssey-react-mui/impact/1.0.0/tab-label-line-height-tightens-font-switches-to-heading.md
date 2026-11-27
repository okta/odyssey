---
summary: Tab label line-height tightens; font switches to heading
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Tabs
---

Tab labels got much tighter. `lineHeight` switched token families, from `theme.typography.body1.lineHeight` 1.42857143 to `TypographyLineHeightUi` 1.2, so the drop is larger than the body line-height token's own move to 1.5 would suggest. The block also gained `fontFamily: TypographyFamilyHeading`, so labels render in Aeonik, and a new `& .MuiTab-iconWrapper { marginInlineEnd: Spacing1 }` rule sets the gap between a tab's icon and its label. The tab strip is shorter than before; re-measure anything positioned below it. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1675-1692; v1.0.0 components.tsx:1847-1894.
