---
summary: Row selection callbacks fire synchronously from the setter, not once on mount
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
commit: 8f3ac8655
onlyRelevantIf: a DataView whose selection callbacks relied on being called once on mount, or on being deferred to an effect
---

The selection callbacks moved from post-render effects into the setter. They now fire synchronously and no longer fire once on mount with an empty selection. Check handlers that counted on that initial call or on the deferred timing.
