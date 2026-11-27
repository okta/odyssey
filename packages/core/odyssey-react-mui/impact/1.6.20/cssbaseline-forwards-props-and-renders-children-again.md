---
summary: "`CssBaseline` forwards props and renders children again"
affectedExports:
  - CssBaseline
files:
  - packages/odyssey-react-mui/src/CssBaseline.tsx
commit: 59b877bc1
onlyRelevantIf: "`CssBaseline` is given children or props and 1.6.3 through 1.6.19 dropped them"
---

`CssBaseline` forwards every prop to MUI again, so children render and options such as `enableColorScheme` take effect once more. Content that vanished on 1.6.3 reappears, which can change page height.
