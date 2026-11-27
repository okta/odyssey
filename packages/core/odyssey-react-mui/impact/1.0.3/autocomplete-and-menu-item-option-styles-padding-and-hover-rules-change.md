---
summary: Autocomplete and menu item option styles, padding, and hover rules change
affectedExports:
  - Autocomplete
  - MenuButton
  - MenuItem
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 1bffb3bca
---

The Autocomplete option styles moved out of MUI's option slot into a nested selector with new hover, focused and aria-selected rules, and MuiMenuItem gained inline padding and a focus-visible background. Option height, padding and the selected-option colour all change, and the new selectors sit at a different specificity from the old slot-based ones.
