---
summary: Select menu's 200px minimum height is removed
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: a7af43981
---

The minHeight: 200px added to the Select menu paper at 1.25.0 is removed; maxHeight: 50vh stays. A Select with a short option list opens a menu sized to its content again. An upgrade that crosses both 1.25.0 and 1.30.0 sees neither state.
