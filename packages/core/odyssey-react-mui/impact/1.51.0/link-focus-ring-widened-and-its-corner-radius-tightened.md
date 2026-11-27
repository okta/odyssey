---
summary: Link focus ring widened and its corner radius tightened
affectedExports:
  - Banner
  - Callout
  - HintLink
  - Link
  - PageTemplate
  - SideNav
  - Toast
  - TopNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: f3345e067
---

The link focus ring got wider, moving from the tight outline width to the main one, and its corner radius tightened. The rule sits on the shared link slot, so it reaches every link the library renders internally, not only the ones a consumer writes. Check focus appearance on links, especially where a link sits close to adjacent content and the wider ring can now overlap it.
