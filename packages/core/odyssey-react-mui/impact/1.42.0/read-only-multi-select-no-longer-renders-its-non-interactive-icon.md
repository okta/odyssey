---
summary: Read-only multi-select no longer renders its non-interactive icon
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: 35d710aed
onlyRelevantIf: a Select that is read-only, accepts multiple choices, and is controlled through `value` rather than `defaultValue`
---

A read-only multi-select no longer renders the non-interactive icon beside its visible selected-value chips. The icon was already gated on the controlled state, so an uncontrolled multi-select never had it. `Chips` renders twice: once through `renderValue` inside the input, which is not passed `isReadOnly` and so resolves to `opacity: 0`, and once in `ChipsPositioningContainer` layered over the top, which is the copy the user sees. Only the visible copy receives `isReadOnly`, so the new `!isReadOnly` guard strips the icon there and leaves it in the hidden copy. The number of `CloseCircleFilledIcon` elements in the DOM therefore halves, from two per chip to one. Check read-only multi-select layouts that allowed room for that icon.
