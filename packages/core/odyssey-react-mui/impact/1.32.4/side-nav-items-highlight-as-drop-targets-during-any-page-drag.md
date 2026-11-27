---
summary: Side nav items highlight as drop targets during any page drag
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemContent.tsx
commit: 1ed17dd38
onlyRelevantIf: drag-and-drop anywhere on a page that also renders the side nav
---

Side nav items now listen for dragover, dragleave, and drop, and paint a drop-target background while something is dragged over them. Any drag on the page can now light up nav items, whether or not the nav is a valid target. The subject of `1ed17dd38` is about logo click support and does not mention this.
