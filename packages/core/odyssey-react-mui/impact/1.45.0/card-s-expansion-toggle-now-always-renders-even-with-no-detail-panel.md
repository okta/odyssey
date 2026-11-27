---
summary: Card's expansion toggle now always renders, even with no detail panel
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataCard.tsx
commit: 7a65ff5f0
onlyRelevantIf: a card layout that renders no detail panel
---

The expansion toggle is now always rendered, falling back to a hidden disabled button when there is no detail panel, and its container is always present. A card with no detail panel emits an extra button and an extra wrapper it did not before, whether or not selection is on. Check accessibility snapshots and any test that counted buttons inside a card.
