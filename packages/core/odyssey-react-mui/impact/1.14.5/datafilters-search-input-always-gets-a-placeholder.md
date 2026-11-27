---
summary: DataFilters search input always gets a placeholder
affectedExports:
  - DataFilters
files:
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 9490c6587
onlyRelevantIf: a DataFilters is rendered
---

DataFilters' search input now always receives a `placeholder` set from the same translated string as its label. A search field that previously showed an empty box now shows placeholder text.
