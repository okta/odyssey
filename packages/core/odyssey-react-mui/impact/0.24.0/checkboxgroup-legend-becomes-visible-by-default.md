---
summary: CheckboxGroup legend becomes visible by default
affectedExports:
  - CheckboxGroup
files:
  - packages/odyssey-react-mui/src/CheckboxGroup.tsx
commit: 02dd19a18
---

CheckboxGroup switched hasVisibleLabel from false to true, so the group label that was screen-reader-only now renders as a visible legend. Any layout that allowed no vertical space for it shifts.
