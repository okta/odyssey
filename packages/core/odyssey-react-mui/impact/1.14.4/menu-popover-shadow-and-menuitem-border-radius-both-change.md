---
summary: Menu popover shadow and MenuItem border radius both change
affectedExports:
  - MenuButton
  - MenuItem
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: efe2839f0
---

MuiMenu gained `defaultProps: { elevation: 2 }`, so a menu popover's shadow changes from MUI's own default elevation 8 shadow to Odyssey's DepthMedium token, and MuiMenuItem's border radius moved from BorderRadiusTight (4px) to BorderRadiusMain (6px). Check menus that sit against a shadowed surface and layouts that measured the popover's visual bounds.
