---
summary: RadioGroup stops overwriting a child Radio's own isDisabled and isReadOnly
affectedExports:
  - RadioGroup
  - Radio
files:
  - packages/odyssey-react-mui/src/RadioGroup.tsx
commit: 0c52e7d30
onlyRelevantIf: a Radio inside a RadioGroup carries its own isDisabled or isReadOnly
---

A child Radio's own `isDisabled` and `isReadOnly` are now honoured. Previously the group overwrote both on every child, so a per-radio value was silently discarded. Radios that looked enabled will now render disabled where the prop was already being passed.
