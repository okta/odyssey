---
summary: Disabled Button no longer renders its `Tooltip` wrapper at all
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/Button.tsx
commit: d0d8925e1
onlyRelevantIf: a Button that is both disabled and given `tooltipText`
---

A disabled Button no longer renders its Tooltip wrapper at all. The tooltip that explained why the button was unavailable is gone.
