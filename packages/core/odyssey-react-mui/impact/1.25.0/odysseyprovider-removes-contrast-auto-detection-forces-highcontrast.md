---
summary: OdysseyProvider removes contrast auto-detection, forces highContrast
affectedExports:
  - OdysseyProvider
  - Button
  - Tag
files:
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/odyssey-react-mui/src/theme/createOdysseyMuiTheme.ts
commit: d236063dd
---

The 1.24.0 contrast auto-detection is removed. OdysseyProvider no longer mounts ContrastModeProvider, the extra div it added is gone, and OdysseyThemeProvider hardcodes contrastMode to "highContrast". An app whose gray background had put it in lowContrast at 1.24.0 or 1.24.1 sees Button and Chip colors change back. The ContrastMode, ContrastModeProvider, useContrastContext and useParentBackgroundColor exports still exist at this version but are no longer wired into anything; they are deleted at 1.26.0.
