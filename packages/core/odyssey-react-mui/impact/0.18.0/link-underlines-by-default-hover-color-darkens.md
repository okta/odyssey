---
summary: Link underlines by default; hover color darkens
affectedExports:
  - odysseyTheme
  - Link
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 944a76c8d
---

MuiLink's root changed from text-decoration: none to underline, and its hover colour darkened from primary.main to primary.dark. Every link is now underlined at rest, which changes the look of links you had deliberately left plain. Check navigation and toolbar links styled as buttons. This hash is the 0.18.0 squash merge, not a commit for this change alone.
