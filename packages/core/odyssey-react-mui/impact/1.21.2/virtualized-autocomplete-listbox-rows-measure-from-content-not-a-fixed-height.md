---
summary: Virtualized Autocomplete listbox rows measure from content, not a fixed height
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/Autocomplete.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: b0ad1ee88
onlyRelevantIf: an Autocomplete with isVirtualized
---

The virtualized listbox was rewritten from fixed 45px rows to rows measured from their own content, and react-virtualized-auto-sizer was dropped from the package's dependencies. Each option is now rendered as a li inside a wrapper div, so the listbox is ul > div > li rather than ul > li. Option heights, the listbox's total height, and the ARIA structure between listbox and option all differ. Check CSS and selectors that assumed a direct li child, and check that long option labels now wrap instead of clipping. The popper's height: 100% was also removed, leaving only maxHeight: 40vh.
