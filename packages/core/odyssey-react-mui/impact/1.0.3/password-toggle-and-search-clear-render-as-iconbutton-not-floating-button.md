---
summary: Password toggle and search clear render as `IconButton`, not floating `Button`
affectedExports:
  - PasswordField
  - SearchField
files:
  - packages/odyssey-react-mui/src/PasswordField.tsx
  - packages/odyssey-react-mui/src/SearchField.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 1bffb3bca
---

The password visibility toggle and the search clear control changed from an Odyssey Button with variant="floating" to a MUI IconButton, and a new MuiIconButton override sets its padding to Spacing1. The rendered element, its class names and its hit area all change, and the accessible label is now on the icon button rather than on a Button.
