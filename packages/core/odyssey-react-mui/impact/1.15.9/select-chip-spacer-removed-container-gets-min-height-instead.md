---
summary: Select chip spacer removed, container gets min-height instead
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: bd941efd5
onlyRelevantIf: a Select accepts multiple choices
---

The chip layout changed again. The invisible spacer element was removed outright and the chip container took a `min-height` of Spacing6 in its place, and the chips now read the component's internal selection directly rather than receiving it as a prop, rendering only when that value is an array. Check the field's height with and without selections.
