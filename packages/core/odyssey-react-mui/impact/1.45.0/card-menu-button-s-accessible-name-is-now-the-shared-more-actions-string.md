---
summary: Card menu button's accessible name is now the shared `More actions` string
affectedExports:
  - Card
  - DataView
files:
  - packages/core/odyssey-react-mui/src/Card.tsx
commit: 7a65ff5f0
onlyRelevantIf: a Card rendered with `menuButtonChildren`, which is what renders the menu button
---

The card menu button's accessible name changed from `Card menu` to the shared `More actions` string, in every locale including English. Its tooltip is now translated too, and reads the same at English. Check accessibility snapshots and any test that found the card menu by its previous name.
