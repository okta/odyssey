---
summary: Link focus ring becomes rounded; underline hides while focused
affectedExports:
  - Link
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Link
---

Link hover lightened from #22307c to #2e40a5, and the focus treatment changed shape. Focus-visible gained `borderRadius: BorderRadiusMain` 6px, so the ring is now rounded rather than square, and `textDecoration: "none"`, so the underline disappears while focused. The ring colour also went #4c64e1 to #546be7. Rest and visited colours are unchanged at #4c64e1, because `TypographyColorAction` resolves to `HueBlue600`, the same literal the old `palette.primary.main` carried. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1343-1362; v1.0.0 components.tsx:1501-1522.
