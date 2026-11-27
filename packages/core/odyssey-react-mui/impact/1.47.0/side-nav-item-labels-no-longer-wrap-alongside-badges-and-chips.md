---
summary: Side nav item labels no longer wrap alongside badges and chips
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemLinkContent.tsx
commit: 3fe24091c
onlyRelevantIf: impact depends on the consumer's label lengths and on whether they render count badges or status chips in nav items
---

The nav item label container lost `flexWrap: wrap`, so a label, its badge, and its status chip are now forced onto one line instead of wrapping. Check nav items with long labels plus a badge, because content can now overflow where it previously wrapped.
