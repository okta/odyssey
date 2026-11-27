---
summary: Dialog backdrop scrim restored to a darker, warmer tint
affectedExports:
  - odysseyTheme
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 972a2c309
---

The MuiBackdrop scrim was restored to rgba(29, 29, 33, 0.75), reversing the 0.17.1 commenting-out, and an invisible backdrop is now explicitly transparent. Modal scrims go back to darker and warmer than MUI's default.
