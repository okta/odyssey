---
summary: "Breadcrumbs restyle smaller: font size, padding, hover background, outline"
affectedExports:
  - Breadcrumb
  - BreadcrumbList
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/Breadcrumbs.tsx
commit: 45d473bda
---

Breadcrumbs were restyled against Figma: font size dropped from TypographySizeBody to TypographySizeSubordinate, icons are pinned to Spacing3 wide, link padding became `paddingInline: Spacing1` with `paddingBlock: 2`, hover background lightened from HueNeutral200 to HueNeutral100, the two-layer `focus-visible` box shadow became a single inset outline at offset -2, and the separator gained bold weight with asymmetric margins of 6 and 4. The whole trail is shorter and narrower. The overflow trigger's single `…` character was also replaced with three ASCII periods, and the current page now renders through `Subordinate` rather than `Typography`.
