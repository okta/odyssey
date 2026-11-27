---
summary: Filter tags resolve text from the matching option's label everywhere now
affectedExports:
  - DataFilters
files:
  - packages/core/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 3768c6bcd
onlyRelevantIf: impact depends on the consumer's own filter options, specifically whether an option's label differs from its value
---

Filter tags now resolve their text by looking the value up among the filter's options and using that option's label. This completes the same shift as the 1.55.0 change for the remaining code path. Check filter tag text where labels and values differ.
