---
summary: Side nav logo background takes the custom color instead of transparent
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNavHeader.tsx
commit: 21eb6ad43
onlyRelevantIf: a side nav with a custom sideNavBackgroundColor and a logo
---

The logo container's background now takes the custom side nav color when it is meant to match the main area, instead of being `transparent`, and it gained `data-se="sidenav-header-logo-container"`. Check logos drawn against a background that used to show through.
