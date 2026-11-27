---
summary: Accordion summary SVGs now sized and positioned by a theme rule
affectedExports:
  - Accordion
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: fca151056
onlyRelevantIf: an Accordion whose summary contains an icon or any other SVG
---

An ungated svg rule was added to the MuiAccordionSummary root: fontSize 1.2em, height and width 1em, verticalAlign middle, insetBlockStart -0.0625em, position relative. Any SVG inside a summary is now sized and nudged by Odyssey. Check consumer-supplied icons in accordion summaries against their previous size and baseline.
