---
summary: Password field's visibility toggle keeps the same accessible name in both states
affectedExports:
  - PasswordField
files:
  - packages/core/odyssey-react-mui/src/PasswordField.tsx
commit: 847f845c9
---

The visibility toggle's accessible name is now the show string in both states. The `aria-pressed` attribute, which already carried the state, is now the only signal of it. Check accessibility snapshots and any test that found this button by its hide-state name.
