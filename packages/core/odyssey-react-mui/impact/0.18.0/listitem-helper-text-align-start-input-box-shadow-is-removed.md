---
summary: ListItem, helper text align start; input box-shadow is removed
affectedExports:
  - odysseyTheme
  - FormHelperText
  - ListItem
  - IconButton
  - InputBase
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 944a76c8d
---

Smaller theme additions in the same release. MuiListItem gained a root override and both MuiFormHelperText and MuiListItem now set text-align: start. MuiIconButton gained an edgeEnd margin. MuiInputBase's inner input sets box-shadow: none, which suppresses a browser autofill or validation shadow. Check lists you styled yourself and any box-shadow you applied to an input. This hash is the 0.18.0 squash merge, not a commit for this change alone.
