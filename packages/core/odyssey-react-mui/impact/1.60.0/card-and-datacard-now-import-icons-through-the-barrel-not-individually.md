---
summary: Card and DataCard now import icons through the barrel, not individually
affectedExports:
  - Card
  - DataCard
files:
  - packages/core/odyssey-react-mui/src/Card.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/DataCard.tsx
commit: 2457134a3
onlyRelevantIf: the consumer's bundler cannot tree-shake effectively, which decides whether the whole icon set is pulled in
---

Card and DataCard switched from importing individual icon modules to importing through the icon barrel. Nothing renders differently, but a build without effective tree-shaking now pulls the whole icon set in through these components. Check bundle size.
