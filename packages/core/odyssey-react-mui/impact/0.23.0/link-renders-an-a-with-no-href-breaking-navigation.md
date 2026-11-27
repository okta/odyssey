---
summary: Link renders an `<a>` with no `href`, breaking navigation
affectedExports:
  - Link
files:
  - packages/odyssey-react-mui/src/Link.tsx
commit: 9642ae980
---

Link began forwarding `variant` and `target` to MuiLink, where before it forwarded neither. `href` is declared required by the type and is still not forwarded, so every Odyssey Link on 0.23.0 renders an <a> with no href: not navigable, not keyboard focusable, and not matched by link role queries. MuiLink gained cursor: pointer in the same release, which hides the symptom visually. href and rel are restored in 0.24.0 by 5659e4fbb.
