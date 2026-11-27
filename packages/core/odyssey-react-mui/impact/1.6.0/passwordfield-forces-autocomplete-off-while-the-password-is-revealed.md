---
summary: PasswordField forces `autoComplete="off"` while the password is revealed
affectedExports:
  - PasswordField
files:
  - packages/odyssey-react-mui/src/PasswordField.tsx
commit: 4263e28fa
onlyRelevantIf: a PasswordField with a specific autoComplete value that the browser is expected to honour
---

autoComplete is forced to "off" while the password is revealed and only restored to the supplied value when it is masked. The browser's own autofill and password-manager behaviour changes the moment the user clicks the reveal toggle.
