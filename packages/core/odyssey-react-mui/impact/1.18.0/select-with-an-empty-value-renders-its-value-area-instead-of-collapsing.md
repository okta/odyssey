---
summary: Select with an empty value renders its value area instead of collapsing
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: eba0f9e2d
onlyRelevantIf: a Select can hold an empty value
---

`displayEmpty` is passed unconditionally again, restoring behavior that was dropped at 1.14.0. A Select whose value is the empty string renders its value area rather than collapsing, so the field's height and its placeholder behavior change.
