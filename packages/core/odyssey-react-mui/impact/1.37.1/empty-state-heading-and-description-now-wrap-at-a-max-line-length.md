---
summary: Empty state heading and description now wrap at a max line length
affectedExports:
  - EmptyState
  - DataView
  - DataTable
files:
  - packages/odyssey-react-mui/src/EmptyState.tsx
commit: d1906ba80
---

The heading and description are now wrapped in a div with `max-width: TypographyLineLengthMax`. Long empty-state copy wraps earlier and the block no longer fills the container's width. There is also one more DOM level between the empty container and the text.
