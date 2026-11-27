---
summary: Alert title color is now tinted by severity
affectedExports:
  - Banner
  - Callout
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Banner, Callout, or Toast that carries a title
---

The alert title is now tinted by severity instead of inheriting the body colour. A new descendant rule under the alert root sets the title to `Palette<severity>Heading`: #182257 for info, #500d00 for error, #072e19 for success, #352401 for warning, where it was #272727 for all four. The banner variant also zeroes the title's block-end margin. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 had no such rule; v1.0.0 components.tsx:111-127.
