---
summary: Button switches to flex layout, start icon grows
affectedExports:
  - odysseyTheme
  - Button
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 86e8f350b
---

The Button root changed from display: inline-block to inline-flex, a startIcon override was added with a 0.57142857rem inline-end margin, and the start icon's own font size went from inherit to 1.14285714em. Buttons now lay their children out as flex items, so extra markup you put inside a button no longer flows as inline content, and icons are larger. Check buttons with more than a label inside them.
