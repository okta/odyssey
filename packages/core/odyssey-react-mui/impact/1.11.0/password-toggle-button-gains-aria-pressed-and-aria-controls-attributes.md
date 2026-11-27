---
summary: Password toggle button gains `aria-pressed` and `aria-controls` attributes
affectedExports:
  - PasswordField
files:
  - packages/odyssey-react-mui/src/PasswordField.tsx
commit: df351be82
---

The show/hide toggle now carries aria-pressed and aria-controls. Screen readers announce it as a toggle button with a pressed state rather than a plain button, which changes the announcement a user hears alongside the existing show/hide label. Check assertions on that button's role and state.
