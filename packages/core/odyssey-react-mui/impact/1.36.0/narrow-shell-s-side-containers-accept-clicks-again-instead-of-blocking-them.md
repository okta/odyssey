---
summary: Narrow shell's side containers accept clicks again instead of blocking them
affectedExports:
  - NarrowUiShellContent
  - UiShell
  - renderUiShell
  - InnerAppContainer
files:
  - packages/odyssey-react-mui/src/ui-shell/InnerAppContainer.tsx
  - packages/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: e28d3852b
onlyRelevantIf: narrow-viewport shell content below 600px, specifically the slide-out SideNav or a rightSideMenu
---

`pointer-events: none` moved off `StyledAppContentArea` and onto `StyledAppContainerShadowShared`, so the narrow shell's left and right side containers take clicks again. In `NarrowUiShellContent` those hold the slide-out SideNav and `optionalComponents.rightSideMenu`. The top nav's own left and right slots render in `StyledTopNav`, a sibling of `StyledAppContentArea`, so they were never in the disabled subtree and do not change.
