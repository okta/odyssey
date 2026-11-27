---
summary: Breadcrumb labels truncate with an ellipsis past 10rem
affectedExports:
  - Breadcrumb
files:
  - packages/odyssey-react-mui/src/Breadcrumbs.tsx
commit: f6e2038ba
onlyRelevantIf: a Breadcrumbs holds a long label
---

Each breadcrumb's content is now wrapped in a `<span>` with `max-width: 10rem`, `white-space: nowrap`, `overflow: hidden`, and `text-overflow: ellipsis`. Any label longer than 10rem is now truncated with an ellipsis and the full text is no longer visible or selectable. There is no prop to opt out.
