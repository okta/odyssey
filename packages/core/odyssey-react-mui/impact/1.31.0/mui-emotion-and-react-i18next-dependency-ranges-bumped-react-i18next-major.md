---
summary: MUI, Emotion, and react-i18next dependency ranges bumped, react-i18next major
affectedExports:
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/package.json
commit: 4db74b617
---

A large dependency move in one commit. @mui/material, @mui/system, @mui/utils and @mui/icons-material go from ^5.15 to ^5.16, @mui/lab from alpha.165 to alpha.175, all three Emotion packages from ^11.11 to ^11.14, and react-i18next from ^14.0.5 to ^15.1.1, a major. The react and react-dom peer ranges were raised from ^18.2.0 to ^18.3.1. Check for a peer conflict on an app pinned to React 18.2, for a duplicated MUI or Emotion instance if the consumer depends on them directly, and for a duplicated i18next instance across the react-i18next major.
