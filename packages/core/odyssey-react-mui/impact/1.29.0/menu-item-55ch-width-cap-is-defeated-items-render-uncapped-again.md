---
summary: Menu item 55ch width cap is defeated, items render uncapped again
affectedExports:
  - MenuItem
  - MenuButton
  - Select
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: eb3b79955
---

The maxWidth: calc(55ch - Spacing4) cap added at 1.25.0 is defeated by a new spread, !ownerState.isFullWidth && { maxWidth: "100%" }. isFullWidth is not a MUI MenuItem prop so the guard is always true, and the spread comes later in the object, so long menu items are effectively uncapped again. The cap is restored at 1.31.0.
