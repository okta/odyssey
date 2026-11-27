---
summary: Menu items wrap onto multiple lines and cap at roughly 55 characters wide
affectedExports:
  - MenuItem
  - MenuButton
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: f8ee8e08f
onlyRelevantIf: a menu, MenuButton, or Select whose item text is long enough to have been truncated before
---

MuiMenuItem gained whiteSpace: normal and maxWidth: calc(55ch - Spacing4). Long items now wrap onto several lines instead of staying on one, and the item is capped at roughly 55 characters wide. Menu height and width both change. This cap is overridden again at 1.29.0 and restored at 1.31.0.
