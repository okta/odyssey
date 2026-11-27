---
summary: "`CssBaseline` stops forwarding children and props, rendering an empty wrapper"
affectedExports:
  - CssBaseline
files:
  - packages/odyssey-react-mui/src/CssBaseline.tsx
  - packages/odyssey-react-mui/src/index.ts
commit: 0d54b21a9
onlyRelevantIf: "`CssBaseline` is imported from `@okta/odyssey-react-mui` and given children or any prop"
---

`CssBaseline` stopped being a re-export of MUI's component and became a wrapper that takes no arguments, so children and props such as `enableColorScheme` are dropped on the floor. Anything nested inside `<CssBaseline>` disappears from the tree. The `CssBaselineProps` type is still re-exported from MUI, so the type and the component no longer agree. 1.6.20 restores prop forwarding.
