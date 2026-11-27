---
summary: Disabled multi-select chips no longer render a remove affordance
affectedExports:
  - Select
files:
  - packages/core/odyssey-react-mui/src/Select.tsx
commit: d47fec5a4
onlyRelevantIf: a disabled Select that accepts multiple choices
---

A disabled multi-select's chips no longer render a remove affordance, so the delete icon is absent, matching the read-only case. Its `onChange` is now also guarded, though a disabled Select's menu cannot open, so that half has no reachable user path. Check layouts and snapshots for disabled multi-selects.
