---
summary: Card layout's `itemProps` no longer renders a `button` field
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/CardLayoutContent.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/DataCard.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/componentTypes.ts
commit: 7a65ff5f0
onlyRelevantIf: a card layout whose `itemProps` returns a `button`
---

A card layout's `itemProps` no longer has a `button` field, and a `button` it returns is silently dropped rather than rendered. TypeScript flags the excess property on an object literal; a returned object built any other way, and any JavaScript consumer, gets no warning and simply loses the button. Check card layouts that render a button through `itemProps`.
