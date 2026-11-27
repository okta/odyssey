---
summary: Card without an explicit `variant` now renders the row layout, not tile
affectedExports:
  - DataView
  - Card
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataCard.tsx
  - packages/core/odyssey-react-mui/src/Card.tsx
commit: 7a65ff5f0
onlyRelevantIf: a card layout whose `itemProps` does not set `variant`
---

DataCard's tile default for `variant` was removed, and Card has no default of its own, so `variant` reaches Card as `undefined`. A card layout that omits `variant` flips from the column tile layout to the row layout: `InnerContainer` switches `flexDirection` from `column` to `row`, `ImageContainer` loses its `paddingInlineEnd` of `Spacing4` when a menu button is present, and `UpperContentContainer` gains that same padding instead. The title stays at the h5 type scale, rendered as a `div` in both cases, because the only h4 in this component is the one the same commit introduces for an explicit `tile`. Check every card layout that relied on the old default.
