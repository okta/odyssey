---
summary: Single-select check mark comparison changes from loose `==` to strict `===`
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: 40dec732c
---

The check mark beside the chosen single-select option moved from a loose `==` comparison to strict `===`. An option whose `value` is a number no longer matches a string selection, so the tick disappears while the field itself still shows the right text. The multi-select menu checkbox now reads `internalSelectedValues?.includes(...)`, which is `undefined` rather than `false` before a selection exists.
