---
summary: Popover paper gains a 1px solid border
affectedExports:
  - odysseyTheme
  - Menu
  - Select
  - Paper
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 535995ef5
---

MuiPopover's paper gained a 1px solid #d7d7dc border. Every popover-backed surface, which includes Menu and the Select dropdown, now draws a visible outline on top of its shadow. Check popovers you had given a border of your own, which now doubles.
