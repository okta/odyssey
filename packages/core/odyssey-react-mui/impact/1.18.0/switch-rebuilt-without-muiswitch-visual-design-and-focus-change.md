---
summary: Switch rebuilt without MuiSwitch, visual design and focus change
affectedExports:
  - Switch
files:
  - packages/odyssey-react-mui/src/labs/Switch.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e3476db2a
onlyRelevantIf: a Switch is rendered
---

Switch was rewritten and no longer renders MUI's Switch or FormControlLabel at all. It is now a hand-built structure of `div`s and a FormLabel with its own track element, so every `.MuiSwitch-*` class disappears from the DOM along with the whole `MuiSwitch` theme override block. The visual design, the dimensions, and the focus treatment all change. A consumer rendering MUI's own Switch inside an Odyssey provider also loses the Odyssey styling it was picking up from the theme and falls back to MUI's default look.
