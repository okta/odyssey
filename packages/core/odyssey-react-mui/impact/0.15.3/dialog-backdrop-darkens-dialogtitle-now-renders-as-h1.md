---
summary: Dialog backdrop darkens; DialogTitle now renders as `<h1>`
affectedExports:
  - odysseyTheme
  - Dialog
  - DialogActions
  - DialogContent
  - DialogContentText
  - DialogTitle
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c0164b519
---

The whole Dialog family gained theme overrides, and MuiBackdrop's root now takes a rgba(29, 29, 33, 0.75) scrim in place of MUI's rgba(0, 0, 0, 0.5). Dialog paper caps its width, drops its MUI shadow for a drop-shadow filter, and every section gets Odyssey padding. MuiDialogTitle also defaults its component to "h1" where MUI renders an <h2>, so the dialog heading level changes. The Backdrop change reaches any MUI component that uses a backdrop, not only Dialog.
