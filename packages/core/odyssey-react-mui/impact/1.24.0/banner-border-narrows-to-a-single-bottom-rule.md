---
summary: Banner border narrows to a single bottom rule
affectedExports:
  - Banner
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 02874dc04
onlyRelevantIf: a Banner
---

The banner variant gained borderWidth: 0 with borderBottomWidth: 1px, so it goes from the full four-sided border it acquired at 1.23.0 to a single bottom rule. Banner height changes by 1px and the side and top outlines disappear.
