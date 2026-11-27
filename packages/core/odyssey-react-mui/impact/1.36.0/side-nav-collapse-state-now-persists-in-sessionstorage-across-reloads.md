---
summary: Side nav collapse state now persists in sessionStorage across reloads
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
  - packages/odyssey-react-mui/src/ui-shell/SideNav/useIsSideNavCollapsedSessionStorage.ts
  - packages/odyssey-react-mui/src/useSessionStorageState.ts
commit: "8545423e5"
onlyRelevantIf: a collapsible side nav
---

The side nav's collapse state moved into sessionStorage, unconditionally. It now persists across navigations and reloads within the browser session, and on mount the stored value wins over your `isCollapsed` whenever the nav is collapsible; `isCollapsed` is only applied on mount when it is not. A nav that always opened expanded may now open collapsed for a returning user. 1.37.1 makes this opt-in (see that key).
