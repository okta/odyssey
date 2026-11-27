---
summary: Tooltip arrow corners become placement-specific
affectedExports:
  - odysseyTheme
  - Tooltip
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: f7df136c0
---

MuiTooltip's arrow border radius changed from 2px to 0, and four new rules keyed off the popper's data-popper-placement give the arrow's ::before a single 3px rounded corner, picked per placement.
