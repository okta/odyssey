---
summary: Dialog footer block padding drops from `Spacing6` to `Spacing5`
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 18ee5a9a4
---

MuiDialogActions block padding dropped from Spacing6 to Spacing5, so the dialog footer is shorter. Check dialogs whose height was pinned or measured.
