---
summary: Bare SVG inside Link grows from 1em to 1.2em font size
affectedExports:
  - Link
  - Callout
  - HintLink
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: fca151056
onlyRelevantIf: an SVG is placed directly inside a Link, Callout link, or HintLink rather than through Odyssey's own icon slots
---

MuiLink's bare svg rule went from fontSize 1em to 1.2em. Odyssey's own wrappers, .Link-indicator and .Link-icon, gained an explicit svg { fontSize: 1em } that pins them back, so the external-link indicator and the leading icon are unchanged. An SVG the consumer drops straight into a Link renders 20 percent larger.
