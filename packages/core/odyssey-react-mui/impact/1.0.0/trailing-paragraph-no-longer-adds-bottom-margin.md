---
summary: Trailing paragraph no longer adds bottom margin
affectedExports:
  - Paragraph
  - Typography
  - Subordinate
  - Support
  - Legend
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Paragraph or a Typography with `paragraph` set, sitting last inside its container
---

A trailing paragraph no longer contributes bottom margin. A new `&:last-child { marginBlockEnd: 0 }` rule cancels the paragraph slot's 1.143rem block-end margin when it is the last child. Containers sized around a trailing paragraph, card bodies and alert messages in particular, lose 1.143rem of height. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:2080-2082; v1.0.0 components.tsx:2259-2265.
