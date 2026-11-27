---
summary: "`data-se` now also appears on the Select root, in addition to its inner input"
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: bad9607d6
onlyRelevantIf: a test or a stylesheet selects the Select by its `testId`
---

`data-se` is now set on the Select root in addition to the inner input, so a `[data-se="..."]` selector that matched one element now matches two. Check selectors that assume a single match.
