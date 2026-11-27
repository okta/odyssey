---
summary: Multi-select chip container now has `role="list"` with listitem chips
affectedExports:
  - Select
files:
  - packages/core/odyssey-react-mui/src/Select.tsx
commit: f3345e067
onlyRelevantIf: a Select that accepts multiple choices
---

The selected-value chip container became a list, with `role="list"` on the container and `role="listitem"` on each chip, plus an accessible name on the container. That name is a hardcoded English string rather than a translated one, so it stays English in every locale. Check accessibility snapshots, and check any role-based test query over a multi-select.
