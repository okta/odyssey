---
summary: SideNav drag handle focus ring, hover, and active styling restyled
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemContent.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableItem.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableOverlay.tsx
commit: a8609929b
onlyRelevantIf: a sortable SideNav
---

The drag handle was restyled. Its focus ring changed from an inset shadow to a two-layer outer ring, so it now paints outside the handle's box, and the handle gained a hover background and a transparent border that becomes blue while grabbed. The dragged copy of a row also paints the active row background on its own rather than relying on pointer hover, so a keyboard drag now looks like a mouse drag. Check drag appearance and focus for both input methods.
