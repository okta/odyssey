---
summary: Side nav switches from inline-block and grid to fit-content layout
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: 18d0f6c01
---

Side nav box model changed in several places at once: the outer nav element swapped `display: inline-block` for `width: fit-content`, the collapsible content went from `inline-grid` to `grid`, the scrollable region went from `grid` to `inline-grid` and lost `flex: 1 1 100%`, and the list container behaviour follows from that. The nav's measured width and how its regions distribute vertical space both differ.
