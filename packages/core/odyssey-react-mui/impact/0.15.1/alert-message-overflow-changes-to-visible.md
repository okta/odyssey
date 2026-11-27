---
summary: Alert message overflow changes to visible
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: 64411954f
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

An Alert's message block changed to overflow: visible, so a focus ring on a link inside an infobox is no longer clipped at the message edge. Check infoboxes where the ring now extends past the text block.
