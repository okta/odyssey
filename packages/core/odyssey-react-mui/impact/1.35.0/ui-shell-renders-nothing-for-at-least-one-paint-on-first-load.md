---
summary: UI Shell renders nothing for at least one paint on first load
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/UiShell.tsx
commit: 18d0f6c01
---

UI Shell now returns null until its media queries have resolved, because `useUiShellBreakpoints` reports `"none"` before then and `useMediaQuery` seeds its state to `false`. The shell is absent for at least one paint. 1.35.3 fixes the seeding (see that key), so an upgrade crossing both sees no net change.
