---
summary: Dialog close button accessible name no longer comes from the `ariaLabel` prop
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/Dialog.tsx
commit: a2b92b197
---

The Dialog close button's accessible name no longer comes from the `ariaLabel` prop. `ariaLabel` was required, is now optional and deprecated, and the value passed to it is ignored; the name comes from Odyssey's own `close.text` string. Any dialog that gave its close button a specific name ("Close settings", "Dismiss") now announces Odyssey's generic one. Check screen reader scripts and any test querying the button by accessible name.
