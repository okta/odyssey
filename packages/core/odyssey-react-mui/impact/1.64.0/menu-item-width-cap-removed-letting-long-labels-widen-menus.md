---
summary: Menu item width cap removed, letting long labels widen menus
affectedExports:
  - BreadcrumbList
  - DataFilters
  - DataTable
  - DataView
  - MenuButton
  - MenuItem
  - Select
files:
  - packages/core/odyssey-react-mui/src/theme/components/Menu.tsx
  - packages/core/odyssey-react-mui/src/Select.tsx
commit: 23c410216
---

The roughly 55-character width cap on menu items was removed, so long item text stops wrapping and menus can get much wider. The cap sat on the shared menu item slot, so it reaches every menu in the library, including the breadcrumb overflow menu, the data table's row action and settings menus, and the data view's bulk action, layout switcher and row action menus. Select separately began measuring its field on open and writing an inline minimum width onto the dropdown paper. Check menu and dropdown width with long labels, and check any app stylesheet that set a width on the dropdown paper, since an inline style now outranks it.
