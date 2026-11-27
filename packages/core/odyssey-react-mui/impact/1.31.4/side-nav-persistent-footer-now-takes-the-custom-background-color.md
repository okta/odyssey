---
summary: Side nav persistent footer now takes the custom background color
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: 5c34ebb9e
onlyRelevantIf: a side nav with both a custom footer and a custom sideNavBackgroundColor
---

The persistent side nav footer now takes the custom side nav background colour instead of HueNeutralWhite. Check footers whose white background was relied on.
