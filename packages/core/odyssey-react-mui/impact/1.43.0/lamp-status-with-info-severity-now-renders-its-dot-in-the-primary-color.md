---
summary: Lamp Status with info severity now renders its dot in the primary color
affectedExports:
  - Status
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 79f226e96
onlyRelevantIf: a Status rendered with the lamp variant and the info severity
---

The theme gained an info block for the lamp variant's dot, which now renders in the primary color instead of the shared neutral gray. The info pill already had its own block, so only the lamp variant changed. Check the appearance of info-severity lamp Status.
