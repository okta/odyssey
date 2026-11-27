---
summary: Package becomes ESM-only, breaking `require()` imports
affectedExports:
  - Autocomplete
  - Banner
  - Box
  - Button
  - Callout
  - Checkbox
  - CheckboxGroup
  - CircularProgress
  - Dialog
  - Fieldset
  - Form
  - Link
  - MenuButton
  - MenuItem
  - NativeSelect
  - OdysseyProvider
  - PasswordField
  - Radio
  - RadioGroup
  - ScreenReaderText
  - SearchField
  - Select
  - Status
  - Tabs
  - Tag
  - TagList
  - TextField
  - Toast
  - ToastStack
  - Tooltip
  - Typography
files:
  - packages/odyssey-react-mui/package.json
commit: 8f19d3045
---

The package gained "type": "module", making it ESM-only. A CommonJS require() of the package now throws ERR_REQUIRE_ESM, and Jest or any bundler configured to treat node_modules as CJS fails to load it. The "." export also lost its types condition in favour of typesVersions, which changes how TypeScript resolves the types under moduleResolution node16 or bundler.
