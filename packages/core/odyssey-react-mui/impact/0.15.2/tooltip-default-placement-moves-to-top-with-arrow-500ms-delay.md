---
summary: Tooltip default placement moves to top with arrow, 500ms delay
affectedExports:
  - odysseyTheme
  - Tooltip
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
  - packages/odyssey-react-mui/src/themes/odyssey/components.types.ts
commit: 871d2ffcc
---

MuiTooltip gained a theme override and new default props: placement is now "top" where MUI's default is "bottom", arrow is on, and enterDelay rose to 500ms with enterNextDelay 250ms. Every tooltip you render without explicit props moves above its anchor, gains an arrow, and takes five times longer to appear. Check layouts with no room above the anchor, and tests that wait on a tooltip.
