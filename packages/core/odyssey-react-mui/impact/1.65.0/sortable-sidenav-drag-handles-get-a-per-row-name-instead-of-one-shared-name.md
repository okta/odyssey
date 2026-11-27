---
summary: Sortable SideNav drag handles get a per-row name instead of one shared name
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableItem.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableList.tsx
commit: f425943f1
onlyRelevantIf: a sortable SideNav
---

Drag handles gained a per-row accessible name built from the row's label, instead of one name shared by every handle. Check screen-reader output over a sortable nav, and tests that located a handle by its previous shared name.
