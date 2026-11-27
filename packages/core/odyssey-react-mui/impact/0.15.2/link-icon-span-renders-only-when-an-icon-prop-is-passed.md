---
summary: Link icon span renders only when an icon prop is passed
affectedExports:
  - Link
files:
  - packages/odyssey-react-mui/src/components/Link/Link.tsx
commit: c080c80fc
---

Link no longer renders an empty <span class="Link-icon"> when no icon prop is passed. The span is now conditional. Check CSS or queries that assumed .Link-icon is always present, and any :first-child or :nth-child selector inside a Link.
