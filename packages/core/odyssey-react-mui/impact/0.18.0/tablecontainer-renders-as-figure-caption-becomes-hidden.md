---
summary: TableContainer renders as `<figure>`; caption becomes hidden
affectedExports:
  - odysseyTheme
  - TableContainer
  - Table
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 944a76c8d
---

MuiTableContainer now defaults its component to "figure", so the wrapper element changes from <div> to <figure>, and a table's <caption> is made visually hidden while staying available to screen readers. Check CSS and queries that target the container as a div, margin resets that browsers apply to figure, and any caption you were relying on being visible. This hash is the 0.18.0 squash merge, not a commit for this change alone.
