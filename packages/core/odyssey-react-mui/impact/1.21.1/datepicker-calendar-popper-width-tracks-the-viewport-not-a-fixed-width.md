---
summary: DatePicker calendar popper width tracks the viewport, not a fixed width
affectedExports:
  - DatePicker
  - datePickerTheme
files:
  - packages/odyssey-react-mui/src/labs/datePickerTheme.tsx
commit: 44b3ef8da
---

The calendar popper's root went from no width rule to width: calc(100vw - 64px) capped at theme.mixins.maxWidth, and its contentWrapper from a fixed 352/14 rem to width: 100%. The calendar's rendered width now tracks the viewport rather than being fixed, so it looks different at narrow and wide widths and whether it differs at all depends on the consumer's viewport. datePickerTheme is a public export, so this also reaches anyone who merges it into their own theme.
