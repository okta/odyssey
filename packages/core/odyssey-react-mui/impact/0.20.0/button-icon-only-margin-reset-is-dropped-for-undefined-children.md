---
summary: Button icon-only margin reset is dropped for `undefined` children
affectedExports:
  - odysseyTheme
  - Button
  - ListSubheader
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 535995ef5
---

Button gained an endIcon override mirroring startIcon, and the icon-only match now zeroes both icons' margins, but the startIcon's "&:only-child": { margin: 0 } reset was removed. A button that passes a startIcon with no children, where children is undefined rather than the empty string, previously got no icon margin and now gets 0.57142857rem of inline-end margin, so it is wider and the icon is off-centre. MuiListSubheader also gained a bold font weight. Check icon-only buttons built by omitting children.
