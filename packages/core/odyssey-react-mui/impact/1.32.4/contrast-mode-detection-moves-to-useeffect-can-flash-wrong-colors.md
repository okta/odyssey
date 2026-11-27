---
summary: Contrast mode detection moves to useEffect, can flash wrong colors
affectedExports:
  - Surface
  - Tag
  - OdysseyProvider
  - OdysseyThemeProvider
  - UiShell
files:
  - packages/odyssey-react-mui/src/useContrastMode.tsx
commit: 7a65d3df9
---

Contrast mode detection moved from `useLayoutEffect` to `useEffect`, so the MutationObserver that reads the background color is installed after paint rather than before it. Look for a one-frame flash of the wrong contrast colors on components that derive from contrast mode.
