---
summary: MUI's own `Switch` now picks up Odyssey's track, thumb, and focus-ring styling
affectedExports:
  - Switch
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/labs/Switch.tsx
commit: 3a3cdd549
onlyRelevantIf: the application renders MUI's own Switch inside the Odyssey theme
---

A MuiSwitch theme override arrived with the new Switch component, so a Switch imported straight from @mui/material now picks up Odyssey's track, thumb, and focus-ring styling instead of MUI's defaults. Several of its rules use !important. Check any switch that was styled by hand.
