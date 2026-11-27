---
summary: Top nav clips horizontally overflowing content instead of spilling
affectedExports:
  - TopNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/TopNav/TopNav.tsx
commit: 7a65d3df9
onlyRelevantIf: content in the top nav that is wider than the top nav
---

The top nav container gained `overflow-x: hidden`, so horizontally overflowing slot content is clipped instead of spilling. This holds only from 1.32.4 to the 1.34 line; 1.35.0 removes it again (see the 1.35.0 entry), so an upgrade that crosses both sees no net change.
