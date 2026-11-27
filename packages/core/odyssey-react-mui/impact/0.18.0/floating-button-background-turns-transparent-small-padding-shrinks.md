---
summary: Floating button background turns transparent; small padding shrinks
affectedExports:
  - odysseyTheme
  - Button
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e98d36b57
---

The floating Button variant's resting background changed from white to transparent, so it now shows whatever is behind it, and a small Button's inline padding dropped from calc(0.85714286rem - 1px) to calc(0.57142857rem - 1px). Check floating buttons over a coloured or patterned surface, and small buttons in tight rows.
