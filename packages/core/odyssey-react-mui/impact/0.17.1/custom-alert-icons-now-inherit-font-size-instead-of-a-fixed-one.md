---
summary: Custom Alert icons now inherit font size instead of a fixed one
affectedExports:
  - odysseyTheme
  - Alert
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 2a23d5d3b
---

The Alert icon slot changed from a fixed 1.429rem font size to inherit, with the 1.429rem moved onto a nested .MuiSvgIcon-root rule. An SvgIcon-based icon keeps its size, but a custom icon you supply through iconMapping that is not an SvgIcon now inherits the Alert's font size instead. Check custom Alert icons.
