---
summary: "`PageTemplate` description renders as `Paragraph`, not `Subordinate`"
affectedExports:
  - PageTemplate
files:
  - packages/odyssey-react-mui/src/labs/PageTemplate/PageTemplate.tsx
commit: 57af6228b
onlyRelevantIf: a PageTemplate with a description
---

The description renders as `Paragraph` instead of `Subordinate`, so its font size and color change. Check headers whose vertical rhythm was tuned to the smaller subordinate text.
