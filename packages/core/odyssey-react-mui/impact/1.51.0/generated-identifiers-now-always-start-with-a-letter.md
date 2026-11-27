---
summary: Generated identifiers now always start with a letter
affectedExports:
  - createUniqueId
  - useUniqueId
files:
  - packages/core/odyssey-react-mui/src/createUniqueId.ts
commit: f3345e067
onlyRelevantIf: the consumer uses Odyssey's generated identifiers in CSS selectors, or snapshots them
---

Generated identifiers now always begin with a letter, and the random slice moved from the end of the string to a fixed window, so both the shape and the character distribution differ. These values land in `id`, `for`, `aria-labelledby`, and `aria-describedby`. Check selectors and snapshots that depend on the identifier format.
