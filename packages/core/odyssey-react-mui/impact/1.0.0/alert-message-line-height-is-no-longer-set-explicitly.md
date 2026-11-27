---
summary: Alert message line-height is no longer set explicitly
affectedExports:
  - Banner
  - Callout
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Banner, Callout, or Toast whose text runs to more than one line
---

The alert message slot no longer sets its own line height. `lineHeight: theme.typography.body1.lineHeight` was deleted from the `message` slot, so the value now comes from whatever the message inherits. Check multi-line alert copy against the new leading. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:120; the property is absent at v1.0.0 components.tsx:192-203.
