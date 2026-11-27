---
summary: Every MUI Tab gets explicit `tabIndex={0}`, replacing roving tabindex traversal
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/Tabs.tsx
commit: e4eb22169
---

Every MuiTab is now given tabIndex={0} explicitly, which overrides the roving tabindex MUI applies to a tab list. Previously one Tab key press moved past the whole strip to the selected tab's panel; now each tab is its own tab stop. Check keyboard traversal and any test that asserts tab-order position.
