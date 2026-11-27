---
summary: Every icon redrawn from a 24x24 viewBox to 16x16 with new path data
affectedExports:
  - Accordion
  - Autocomplete
  - Banner
  - BreadcrumbList
  - Button
  - Callout
  - Checkbox
  - CheckboxGroup
  - DataFilters
  - DataTable
  - DataView
  - DatePicker
  - Dialog
  - Drawer
  - EmptyState
  - GroupPicker
  - IconWithTooltip
  - MenuButton
  - MenuItem
  - Pagination
  - Picker
  - PickerWithOptionAdornment
  - SearchDropdown
  - SearchField
  - Select
  - SideNav
  - Status
  - Tag
  - Toast
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/icons.generated/
commit: d60667383
---

Every icon was redrawn from a 24 by 24 viewBox to 16 by 16, with new path data rather than a rescale, so stroke weights and optical sizing differ throughout. This is not limited to icons a consumer renders directly: the theme wires redrawn icons into the shared alert, autocomplete, checkbox, and chip slots, so alerts, dropdown indicators, checkboxes, and removable chips all change, and 36 source files import icons directly. Internal SVG structure also changed in places: the up chevron went from one path to two, the grid icon replaced nine circles with a single path, and three chevrons dropped their clip-rule and fill-rule attributes. Check every screen that renders an icon against a visual baseline, and check CSS or tests that select into icon internals such as `circle` or a positional `path`.
