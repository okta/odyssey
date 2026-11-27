---
summary: Side nav rendering is now recursive beyond two nesting levels
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
commit: 3fe24091c
---

Side nav rendering became recursive. Items nested more than two levels deep now render where they were previously dropped, and an item whose `nestedNavItems` is an empty array now renders as a plain leaf rather than an empty accordion. Selection also stopped mutating the array the consumer passed in, and now writes `isSelected: false` explicitly where it previously deleted the key. Check deep nav trees, navs built with empty child arrays, and any code that read `isSelected` back off the array it supplied.
