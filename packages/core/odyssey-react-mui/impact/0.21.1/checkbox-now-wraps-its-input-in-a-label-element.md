---
summary: Checkbox now wraps its input in a `<label>` element
affectedExports:
  - Checkbox
files:
  - packages/odyssey-react-mui/src/Checkbox.tsx
  - packages/odyssey-react-mui/src/index.ts
commit: 7370b5635
---

Checkbox stopped being a re-export of MUI's Checkbox and became an Odyssey wrapper that renders MuiCheckbox inside a FormControlLabel. The input is now wrapped in a <label> element, so DOM queries, CSS descendant selectors and click targets that assumed a bare input see a different tree.
