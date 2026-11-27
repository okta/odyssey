---
summary: MenuItem spacing and hover styling rewritten
affectedExports:
  - odysseyTheme
  - MenuItem
  - Select
  - ListItemIcon
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 535995ef5
---

MuiMenuItem was rewritten: space-between justification removed, minimum height unset, 0.85714286rem block and 1.14285714rem inline padding added, a grey hover background with a touch-device reset, a divider prop border, a disabled state at full opacity in grey, and spacing rules for nested ListItemText and ListItemIcon. A new MuiListItemIcon override unsets the icon's minimum width and inherits its colour. Every menu and every Select dropdown changes item height and hover. Check menu sizing and anything measuring a menu's height.
