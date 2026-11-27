---
summary: Link `href` and `rel` forwarding is restored
affectedExports:
  - Link
files:
  - packages/odyssey-react-mui/src/Link.tsx
commit: 5659e4fbb
---

href and rel are forwarded to MuiLink again, so Links that rendered without an href on 0.23.0 navigate once more. Other props are still not forwarded: className, onClick, sx and id are dropped. onClick arrives at 1.4.0.
