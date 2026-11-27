---
summary: SideNav toggle chevron hover and focus rules gain specificity over a theme rule
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavToggleButton.tsx
commit: ab5640ab8
onlyRelevantIf: a collapsible SideNav
---

The toggle chevron's hover and focus rules were given extra specificity to beat the floating button theme rule that was making the arrow invisible, and the hover background is now forced transparent. Check the toggle handle's appearance on hover and focus.
