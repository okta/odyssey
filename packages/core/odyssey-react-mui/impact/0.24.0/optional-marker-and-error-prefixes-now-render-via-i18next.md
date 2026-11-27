---
summary: Optional marker and error prefixes now render via i18next
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - CheckboxGroup
  - RadioGroup
  - Banner
  - Infobox
files:
  - packages/odyssey-react-mui/src/Field.tsx
  - packages/odyssey-react-mui/src/FieldLabel.tsx
  - packages/odyssey-react-mui/src/FieldError.tsx
  - packages/odyssey-react-mui/src/Banner.tsx
  - packages/odyssey-react-mui/src/Infobox.tsx
commit: d31de878b
---

The optional-field marker, the "Error:" screen-reader prefix and the Banner/Infobox severity prefix all render through i18next now instead of literal English or the raw severity value. If the i18next bundle has not loaded, these positions show the raw key.
