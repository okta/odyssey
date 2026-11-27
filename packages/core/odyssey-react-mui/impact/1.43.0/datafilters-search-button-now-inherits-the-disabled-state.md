---
summary: DataFilters search button now inherits the disabled state
affectedExports:
  - DataFilters
files:
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: f12d7d64e
onlyRelevantIf: the consumer puts DataFilters into a disabled state
---

The filter search button now inherits the disabled state, so it renders disabled and stops accepting clicks when the filters are disabled. Check flows that submitted a search while the filters were disabled.
