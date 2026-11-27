---
summary: Breadcrumb overflow menu item now renders as an anchor, not a list item
affectedExports:
  - Breadcrumb
  - BreadcrumbList
files:
  - packages/odyssey-react-mui/src/Breadcrumbs.tsx
commit: 1b1ca0757
---

An overflowing breadcrumb's menu item now renders as an anchor element instead of the previous list item. Check CSS rules and browser test locators that assume the earlier element type inside the breadcrumb overflow menu, and check middle-click and context-menu behavior if the app relied on the item not being a link.
