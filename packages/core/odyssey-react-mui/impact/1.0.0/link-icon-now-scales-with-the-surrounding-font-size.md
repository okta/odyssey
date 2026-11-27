---
summary: Link icon now scales with the surrounding font size
affectedExports:
  - Link
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Link containing an icon or an external-link indicator
---

The icon inside a link now scales with the link's own text rather than with the root. `svg { fontSize }` went from `"1rem"` to `"1em"`. Inside body text the two agree, but a link placed in a heading, a caption, or anything with a font size other than 1rem now gets a proportionally sized icon where it previously got a fixed one. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1378; v1.0.0 components.tsx:1538.
