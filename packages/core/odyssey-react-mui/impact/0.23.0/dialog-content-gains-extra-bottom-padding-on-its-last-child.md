---
summary: Dialog content gains extra bottom padding on its last child
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: afccff147
onlyRelevantIf: a Dialog whose content is the last child of DialogContent
---

MuiDialogContent gained a :last-child rule raising its block-end padding. Check dialog footers.
