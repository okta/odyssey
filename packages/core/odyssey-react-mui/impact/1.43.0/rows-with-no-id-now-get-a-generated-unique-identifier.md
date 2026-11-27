---
summary: Rows with no `id` now get a generated unique identifier
affectedExports:
  - DataView
files:
  - packages/odyssey-react-mui/src/labs/DataView/DataView.tsx
commit: f3175d42b
onlyRelevantIf: impact depends on the consumer's own data, specifically whether their rows carry an `id`
---

Rows without an `id` and without a caller-supplied `getRowId` now receive a generated unique identifier instead of undefined. Row identity, React reconciliation, and selection state all key off this. Check selection and expansion behavior for data whose rows have no `id`, and note that a generated identifier is not stable across refetches.
