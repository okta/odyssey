---
summary: Callout title is read as content, no longer hidden or the accessible name
affectedExports:
  - Callout
files:
  - packages/core/odyssey-react-mui/src/Callout.tsx
commit: e73e3e216
onlyRelevantIf: a Callout given a title
---

The Callout title is no longer hidden from assistive technology and no longer supplies the Callout's accessible name, which is now just the severity text, and the generated identifier that linked them is gone from the DOM. The title is read as content instead. Check accessibility snapshots and tests that matched a Callout by a name built from its title.
