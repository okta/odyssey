---
summary: Alert no longer draws a border
affectedExports:
  - Banner
  - Callout
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Callout or Toast whose one-pixel border was part of the layout
---

Alerts no longer draw a border. The root sets `border: 0`, and the per-severity `borderColor` plus the `borderStyle`/`borderWidth` pair that the infobox and toast variants set are all gone. Callouts and toasts each lose 2px of outer width and height, and lose the severity-coloured outline. Check anything measured against the bordered box. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:61, 70-82; v1.0.0 components.tsx:70.
