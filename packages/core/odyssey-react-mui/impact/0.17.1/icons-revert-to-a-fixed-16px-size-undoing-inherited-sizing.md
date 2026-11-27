---
summary: Icons revert to a fixed 16px size, undoing inherited sizing
affectedExports:
  - odysseyTheme
  - SvgIcon
  - Icon
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/theme/typography.ts
commit: 674eefd27
---

A new typography.ui variant was added and MuiSvgIcon gained a root style override that sets an absolute font size, 1.14285714rem, alongside the fontSize: "inherit" default prop added at 0.15.0. Icons that had been taking their size from the surrounding font size are pinned back to 16px, reversing the 0.15.0 behaviour. Because every Odyssey icon wraps MUI's SvgIcon with no explicit fontSize, this reaches the Icon wrapper and all 38 named icon exports as well as MUI's own icons. Check icons inside headings, captions and buttons, where the size reverts.
