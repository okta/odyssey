---
summary: Infobox renamed to Callout, adds an extra wrapper `<div>`
affectedExports:
  - Callout
files:
  - packages/odyssey-react-mui/src/Callout.tsx
commit: 8f19d3045
---

The component that was Infobox is now Callout, its Alert variant changed from "infobox" to "callout", and its children are wrapped in an extra <Box component="div">. Even after renaming the import, the rendered tree gains a wrapper div and picks up a different theme variant.
