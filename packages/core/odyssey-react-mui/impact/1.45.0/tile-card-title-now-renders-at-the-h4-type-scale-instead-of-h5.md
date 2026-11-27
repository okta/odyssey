---
summary: Tile card title now renders at the h4 type scale instead of h5
affectedExports:
  - Card
  - DataView
files:
  - packages/core/odyssey-react-mui/src/Card.tsx
commit: 7a65ff5f0
onlyRelevantIf: a Card rendered with the tile variant
---

A tile-variant Card's title now renders at the h4 type scale instead of h5. The element is still a div in both cases, so this is a size change rather than a heading-structure change. Check title wrapping and card height for tiles with long titles.
