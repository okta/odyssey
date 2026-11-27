---
summary: Scrollable Dialog content gets `tabIndex={0}`, adding a tab stop
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/Dialog.tsx
commit: 3f22c7007
onlyRelevantIf: a Dialog whose content overflows and therefore scrolls
---

A scrollable DialogContent now receives tabIndex={0}, adding a tab stop between the dialog title and the first interactive control. Keyboard walkthrough tests and any focus-order assertion change.
