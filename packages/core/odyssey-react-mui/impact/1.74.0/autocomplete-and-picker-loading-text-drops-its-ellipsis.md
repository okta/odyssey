---
summary: Autocomplete and picker loading text drops its ellipsis
affectedExports:
  - Autocomplete
  - GroupPicker
  - Picker
  - PickerWithOptionAdornment
  - SearchDropdown
  - ComposablePicker
files:
  - packages/core/odyssey-react-mui/src/Autocomplete.tsx
  - packages/core/odyssey-react-mui/src/Banner.tsx
  - packages/core/odyssey-react-mui/src/DataTable/DataTable.tsx
  - packages/core/odyssey-react-mui/src/Select.tsx
  - packages/core/odyssey-react-mui/src/__internal.tsx
  - packages/core/odyssey-react-mui/src/labs/DataTablePagination.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/TableLayoutContent.tsx
  - packages/core/odyssey-react-mui/src/labs/GroupPicker.tsx
  - packages/core/odyssey-react-mui/src/labs/OdysseyPickers/ComposablePicker.tsx
  - packages/core/odyssey-react-mui/src/labs/PaginatedTable.tsx
  - packages/core/odyssey-react-mui/src/labs/StaticTable.tsx
  - packages/core/odyssey-react-mui/src/properties/odyssey-react-mui.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ok_PL.properties
  - packages/core/odyssey-react-mui/src/properties/translations/odyssey-react-mui_ok_SK.properties
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableItem.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SortableList/SortableList.tsx
  - packages/core/odyssey-react-mui/src/useMaterialReactTableLocalization.ts
commit: 3ddc7e33a0c36b8ed3e2d6dfea360469fe1bada2
onlyRelevantIf: an Autocomplete or picker is rendered with isLoading, or a test matches its loading text
---

While options load, the open list of `Autocomplete`, `GroupPicker`, `Picker`, `PickerWithOptionAdornment`, `SearchDropdown`, and `ComposablePicker` showed MUI's built-in English `Loading…`, with an ellipsis character. It now shows the translated `autocomplete.loading` string, which is `Loading` in English, with no ellipsis. Check tests or snapshots that match `Loading…` exactly.

The same change routes other built-in English labels through Odyssey's translations, with the same English text as before: Banner's close button, Select's selected-options chips label, DataTable's bulk "More actions" button, `DataTablePagination`'s buttons and counts, GroupPicker's clear, open, close, and no-options text, SideNav's drag instructions and "sortable" role description, and the Material React Table labels in `DataTable`, `DataView`, `PaginatedTable`, and `StaticTable` (select row, select all, sort, expand, pagination, and empty states). English output does not change. A `translationOverrides` entry for these keys now takes effect, and in a language that has them translated these labels are no longer English.
