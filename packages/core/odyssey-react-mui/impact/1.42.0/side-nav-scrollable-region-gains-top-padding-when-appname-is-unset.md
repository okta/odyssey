---
summary: Side nav scrollable region gains top padding when `appName` is unset
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: d6a7e2dd9
onlyRelevantIf: the consumer does not pass `appName`, which is what turns the new padding on
---

The side nav's scrollable region, the `div` carrying `data-se="scrollable-region"`, gained block-start padding when no `appName` is set, where it previously had none. Check the vertical offset of the first nav item in apps that leave `appName` unset.
