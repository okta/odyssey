---
summary: Clickable Card hover loses its gray background tint
affectedExports:
  - Card
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 052d805ad
onlyRelevantIf: a clickable Card
---

MuiCard's &.isClickable:hover lost backgroundColor: HueNeutral50 and now only raises the shadow. A clickable Card no longer tints gray on hover, so the hover affordance is weaker on backgrounds where the shadow reads poorly.
