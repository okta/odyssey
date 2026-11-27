---
summary: Modal, Popover, and Popper gain a `container` default from `shadowRootElement`
affectedExports:
  - createOdysseyMuiTheme
  - OdysseyProvider
  - OdysseyThemeProvider
  - Dialog
  - Tooltip
  - MenuButton
  - Select
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/createShadowDom.ts
  - packages/odyssey-react-mui/src/theme/createOdysseyMuiTheme.ts
commit: b7b9cdb3e
---

MuiModal, MuiPopover and MuiPopper gained a container defaultProp fed from a new shadowRootElement theme input. With no shadow root the value is undefined and portals still land on document.body, but the defaultProp now exists, so a consumer's own container defaultProps merge differently. createOdysseyMuiTheme's signature also changed from a positional tokens argument to an object.
