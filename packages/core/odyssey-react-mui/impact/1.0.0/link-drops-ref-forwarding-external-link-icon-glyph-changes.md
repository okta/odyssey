---
summary: Link drops ref forwarding; external-link icon glyph changes
affectedExports:
  - Link
files:
  - packages/odyssey-react-mui/src/Link.tsx
commit: 8f19d3045
---

Link stopped being a forwardRef component, so a ref passed to it is ignored. Its external-link indicator also changed from an inline hand-written SvgIcon path to the generated ExternalLinkIcon, which is a different glyph at a different size.
