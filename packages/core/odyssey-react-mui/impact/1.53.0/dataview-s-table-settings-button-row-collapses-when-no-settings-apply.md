---
summary: DataView's table settings button row collapses when no settings apply
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
commit: 0da0e3977
onlyRelevantIf: a DataView in table layout that sets neither column visibility nor changeable density
---

The table settings button is now gated on column visibility or changeable density being enabled, and the whole additional-actions row collapses when nothing else qualifies for it, so a toolbar row disappears. Check toolbar height.
