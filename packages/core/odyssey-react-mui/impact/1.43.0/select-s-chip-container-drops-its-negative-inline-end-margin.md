---
summary: Select's chip container drops its negative inline end margin
affectedExports:
  - Select
files:
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: 8a51f693d
---

The Select theme's chip-container override dropped its negative inline-end margin and keeps the negative margin on the inline-start side only. Check the inline-end spacing of selected-value chips in a multi-select.
