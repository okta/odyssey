---
summary: Breadcrumb's `maxVisibleItems` default drops from unlimited to 5
affectedExports:
  - BreadcrumbList
  - Breadcrumb
files:
  - packages/odyssey-react-mui/src/Breadcrumbs.tsx
commit: 33afc8923
---

maxVisibleItems changed its default from children.length (never truncate) to 5. A breadcrumb trail with more than five items now collapses its middle into an overflow menu instead of rendering in full. Note the exported component is BreadcrumbList, not Breadcrumbs; the file exports Breadcrumb, BreadcrumbList and BreadcrumbContext only.
