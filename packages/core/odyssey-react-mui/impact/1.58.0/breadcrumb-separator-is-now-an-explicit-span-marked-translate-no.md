---
summary: Breadcrumb separator is now an explicit `span` marked `translate="no"`
affectedExports:
  - Breadcrumb
  - BreadcrumbList
files:
  - packages/core/odyssey-react-mui/src/Breadcrumbs.tsx
commit: 5af88546d
---

The breadcrumb separator is now an explicit `span` marked `translate="no"` rather than the library's default node. Check CSS and test locators that matched the separator, and check machine-translation output where the slash was previously translated.
