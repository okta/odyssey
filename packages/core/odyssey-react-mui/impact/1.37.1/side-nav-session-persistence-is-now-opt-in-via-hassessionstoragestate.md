---
summary: Side nav session persistence is now opt in via `hasSessionStorageState`
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
  - NarrowUiShellContent
  - WideUiShellContent
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
  - packages/odyssey-react-mui/src/ui-shell/SideNav/types.ts
  - packages/odyssey-react-mui/src/ui-shell/UiShell.tsx
commit: fb7653f66
---

The sessionStorage-backed collapse state 1.36.0 introduced is now opt-in behind a new `hasSessionStorageState` prop, defaulting to local component state. UI Shell turns it on only at the wide breakpoint, so at medium widths and below the nav no longer remembers its state. A direct SideNav consumer loses the persistence entirely unless it opts in.
