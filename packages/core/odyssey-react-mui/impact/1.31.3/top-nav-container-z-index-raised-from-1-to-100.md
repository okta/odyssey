---
summary: Top nav container z-index raised from 1 to 100
affectedExports:
  - TopNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/TopNav/TopNav.tsx
commit: 40de8448b
onlyRelevantIf: content of your own sits near the top nav and participates in stacking
---

The top nav container's z-index went from 1 to 100. Check overlays, sticky headers, and dropdowns of your own that previously drew above it.
