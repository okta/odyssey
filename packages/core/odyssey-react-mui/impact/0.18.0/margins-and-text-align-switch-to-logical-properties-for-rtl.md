---
summary: Margins and text-align switch to logical properties for RTL
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 944a76c8d
---

Physical CSS properties were swapped for logical ones across FormControlLabel, TableCell, TableSortLabel, Tooltip, Alert and IconButton: margin-left and margin-right became margin-inline-start and margin-inline-end, and text-align: left and right became start and end. In a left-to-right document nothing moves. In a right-to-left document every one of those now mirrors, where before it stayed pinned to the physical side. Check RTL locales for spacing and alignment that was previously wrong in your favour. This hash is the 0.18.0 squash merge, not a commit for this change alone.
