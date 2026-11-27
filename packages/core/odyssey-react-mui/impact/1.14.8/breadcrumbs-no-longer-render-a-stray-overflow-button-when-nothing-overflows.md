---
summary: Breadcrumbs no longer render a stray overflow button when nothing overflows
affectedExports:
  - BreadcrumbList
files:
  - packages/odyssey-react-mui/src/Breadcrumbs.tsx
commit: a27f1b69f
onlyRelevantIf: a Breadcrumbs holds fewer items than maxVisibleItems, which defaults to 5
---

The overflow trigger was gated on `breadcrumbSections.insideMenu`, which is always a truthy array, so a `...` button rendered even when the menu behind it was empty. It is now gated on the array's length, and `maxVisibleItems` is clamped into `[0, children.length]`. A short breadcrumb trail loses the stray `...` button, which changes both the rendered width and the tab order.
