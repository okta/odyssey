---
summary: "`ScopedCssBaseline` root background becomes transparent instead of theme default"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 13807d671
onlyRelevantIf: ScopedCssBaseline relied on for the page or panel background colour
---

MuiScopedCssBaseline's root gained background: transparent, overriding MUI's own default of palette.background.default. The baseline wrapper stops painting a background, so whatever sits behind it shows through. Since OdysseyProvider renders this wrapper, the change reaches every app on the provider.
