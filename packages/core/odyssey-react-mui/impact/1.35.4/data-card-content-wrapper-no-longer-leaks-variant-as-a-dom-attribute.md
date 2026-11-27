---
summary: Data card content wrapper no longer leaks `variant` as a DOM attribute
affectedExports:
  - DataView
files:
  - packages/odyssey-react-mui/src/labs/DataView/DataCard.tsx
commit: 566cda8cc
onlyRelevantIf: a CSS or test selector on the data card's `variant` attribute
---

The card content wrapper now blocks `variant` in `shouldForwardProp`, so the invalid `variant` attribute it used to leak onto the div is gone. The commit's subject is about nested scroll containers and does not mention this.
