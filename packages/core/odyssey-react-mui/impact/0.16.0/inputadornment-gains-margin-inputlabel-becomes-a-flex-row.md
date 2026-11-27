---
summary: InputAdornment gains margin; InputLabel becomes a flex row
affectedExports:
  - odysseyTheme
  - InputAdornment
  - InputLabel
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ba06723a0
---

MuiInputAdornment's inner margins went from 0 to 0.57142857rem on the side facing the field, and it gained a minimum width, action.active colouring and nowrap. MuiInputLabel's root became a flex row with space-between. Check fields with adornments, and labels where you positioned a trailing element such as an optional marker or a character count.
