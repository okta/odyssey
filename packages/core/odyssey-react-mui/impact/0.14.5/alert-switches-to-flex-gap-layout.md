---
summary: Alert switches to flex gap layout
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
  - packages/odyssey-react-mui/src/themes/odyssey/components.types.ts
commit: 301ec5c41
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

Alert layout moved to flex gap: the root gained gap: 1.14285714rem and the icon's right margin went to 0. A banner now centres its content and positions its close action absolutely at the right edge. For an Alert that carries an action, the space between message and action changed, because the gap now applies there too.
