---
summary: SideNav list structure rebuilt with real list roles instead of `role="none"`
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemContent.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableItem.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableList.tsx
commit: 78ed29e9c
---

The top-level nav list carried `role="none"`, which removed both its own `list` role and the implicit `listitem` role of every child, so the nav exposed no list structure at all; it is now a real list of real list items, and its accessible name is none, because the `navigation.label` string sits on the surrounding `nav` element rather than on the list. The nested list under an expandable item was presentational for the same reason and is now a real list whose accessible name is its parent item's label. The loading skeleton changed from a div to a list item. The nav item root is now a list item normally and a div inside a sortable list, each sortable row stopped wrapping its children in its own list element, and the drag-and-drop live region now portals to the document body so it is not an invalid non-list-item child. Check list structure, accessibility snapshots, CSS or locators written against the previous element types, and any body-level assertion that now sees the live region.
