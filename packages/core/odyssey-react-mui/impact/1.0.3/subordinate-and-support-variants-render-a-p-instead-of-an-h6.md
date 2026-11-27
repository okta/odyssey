---
summary: "`subordinate` and `support` variants render a `p` instead of an `h6`"
affectedExports:
  - Typography
  - Subordinate
  - Support
files:
  - packages/odyssey-react-mui/src/Typography.tsx
commit: 1bffb3bca
---

variant="subordinate" and variant="support" rendered an <h6> element on 1.0.0 through 1.0.2 and now render a <p>. The document's heading outline changes, and role-based heading queries stop matching this text.
