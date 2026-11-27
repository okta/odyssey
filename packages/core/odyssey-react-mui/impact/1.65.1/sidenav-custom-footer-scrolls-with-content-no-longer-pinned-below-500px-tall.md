---
summary: SideNav custom footer scrolls with content, no longer pinned below 500px tall
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: 361c97ac3
onlyRelevantIf: a SideNav given a custom footer, at a viewport at or below 500 pixels tall
---

At a compact viewport height the custom footer renders inside the scrollable container instead of pinned outside it. The compact branch also drops the condition that suppressed the custom footer when footer items are present, so a nav with both now renders the custom footer at that height where it previously rendered nothing. Check footer position and duplication at short viewport heights.
