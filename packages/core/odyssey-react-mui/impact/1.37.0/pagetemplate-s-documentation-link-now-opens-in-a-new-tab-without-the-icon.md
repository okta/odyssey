---
summary: "`PageTemplate`'s documentation link now opens in a new tab without the icon"
affectedExports:
  - PageTemplate
files:
  - packages/odyssey-react-mui/src/labs/PageTemplate/PageTemplate.tsx
  - packages/odyssey-react-mui/src/labs/PageTemplate/DocumentationLink.tsx
commit: 9f9728c45
onlyRelevantIf: a PageTemplate with a documentationLink
---

The documentation link now opens in a new tab (`target="_blank"`) and renders through a new internal DocumentationLink built on MUI's Link rather than Odyssey's `Link`. The theme's `MuiLink.styleOverrides.root` applies to either, so the colour, hover and focus ring are retained. What the internal component does not carry is `variant`, `rel`, `onClick`, `ariaLabel`, `testId`, `translate`, a forwarded ref, and the `Link-indicator` external-link icon Odyssey's `Link` renders when `target` is `_blank`. PageTemplate was not passing any of those, so the visible difference is the missing external-link icon on a link that now opens in a new tab.
