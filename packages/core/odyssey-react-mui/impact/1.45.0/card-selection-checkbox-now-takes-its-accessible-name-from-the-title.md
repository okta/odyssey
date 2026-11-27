---
summary: Card selection checkbox now takes its accessible name from the title
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/CardLayoutContent.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/DataCard.tsx
commit: 7a65ff5f0
onlyRelevantIf: a card layout with selection enabled
---

The card selection checkbox moved into DataCard and now takes its accessible name from the card title, where it previously had none. Check accessibility snapshots and any test that located these checkboxes by position rather than by name.
