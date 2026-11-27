---
summary: Removable or clickable Tag root now renders through MUI's ButtonBase
affectedExports:
  - DataFilters
  - DataView
  - GroupPicker
  - PickerWithOptionAdornment
  - Tag
  - TagList
files:
  - packages/core/odyssey-react-mui/src/Tag.tsx
  - packages/core/odyssey-react-mui/src/labs/DataFilters.tsx
commit: ac3112bd2
---

A removable or clickable Tag now renders its root through MUI's ButtonBase, where the previous Emotion-level element override replaced that root outright. The root gains `role="button"` and `tabindex="0"`, becomes keyboard focusable and Enter or Space activatable, and receives the chip focus-visible class. The element type itself is unchanged: a list item inside a TagList, a div outside one. `component`, `focusVisibleClassName` and `disableRipple` also stop leaking onto that element as invalid attributes. Removable tags gained `aria-keyshortcuts` announcing Backspace, and the DataFilters active-filter tag list gained an accessible name. Check focus order, accessibility snapshots, and test locators written against an inert tag root.
