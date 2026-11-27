---
summary: Menu `Divider` elements get a top border in `BorderColorDisplay`
affectedExports:
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d0d8925e1
onlyRelevantIf: a MenuButton with a `Divider` among its children
---

MuiMenu gained an `& hr` rule giving any horizontal rule inside a menu a single top border in BorderColorDisplay. A divider that previously drew MUI's default rule now draws Odyssey's.
