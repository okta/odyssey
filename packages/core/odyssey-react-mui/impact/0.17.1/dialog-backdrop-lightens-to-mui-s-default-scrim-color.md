---
summary: Dialog backdrop lightens to MUI's default scrim color
affectedExports:
  - odysseyTheme
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: "250574053"
---

The MuiBackdrop background-colour override was commented out, so backdrops fall back to MUI's own rgba(0, 0, 0, 0.5) instead of Odyssey's rgba(29, 29, 33, 0.75). Every modal scrim gets lighter and cooler. This is reversed again at 0.18.0, so an upgrade that skips 0.17.1 never sees it.
