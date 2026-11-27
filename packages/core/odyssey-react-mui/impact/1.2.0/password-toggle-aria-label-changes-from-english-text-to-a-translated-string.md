---
summary: Password toggle `aria-label` changes from English text to a translated string
affectedExports:
  - PasswordField
files:
  - packages/odyssey-react-mui/src/PasswordField.tsx
commit: 3e9cf373c
---

PasswordField's visibility toggle changed its aria-label from the fixed English "toggle password visibility" to the translated passwordfield.icon.arialabel. A test or end-to-end locator matching the old string no longer finds the button.
