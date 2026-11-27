---
summary: DataFilters active filter tags now display the option's label
affectedExports:
  - DataFilters
files:
  - packages/core/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 981a0f328
onlyRelevantIf: impact depends on the consumer's own filter options, specifically whether an option's label differs from its value
---

Active filter tags now display the option's label where they previously displayed its value. For options whose label and value differ, the visible text, the tag's accessible name, and its width all change, and a localized label now appears where a machine value used to. Check filter tag text and layout.
