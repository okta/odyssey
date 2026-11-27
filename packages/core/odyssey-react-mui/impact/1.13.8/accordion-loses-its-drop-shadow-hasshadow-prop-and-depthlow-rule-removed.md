---
summary: Accordion loses its drop shadow; `hasShadow` prop and `DepthLow` rule removed
affectedExports:
  - Accordion
files:
  - packages/odyssey-react-mui/src/Accordion.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 30e962f6f
---

Every Accordion loses its drop shadow. The `hasShadow` prop defaulted to `true`, and both the prop and the `DepthLow` rule it switched on are gone, so an Accordion that never mentioned the prop still changes. Check where the shadow was separating an Accordion from the surface behind it.
