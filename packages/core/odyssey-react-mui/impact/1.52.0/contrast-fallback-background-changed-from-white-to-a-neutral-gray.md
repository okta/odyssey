---
summary: Contrast fallback background changed from white to a neutral gray
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
  - SearchField
  - Surface
  - Tag
files:
  - packages/core/odyssey-react-mui/src/useContrastMode.tsx
commit: c5e1864e9
onlyRelevantIf: impact depends entirely on the consumer's DOM. Only an app whose ancestor chain sets no explicit non-transparent background, and which does not pass `contrastMode` to the provider, changes mode
---

The fallback background used when contrast detection walks to the top of the tree without finding a color changed from white to a neutral gray, and that gray resolves to high contrast rather than low. Every contrast-aware component then picks different borders, surfaces, and input backgrounds. This is the widest-reaching visual change in the band, and it is silent: nothing in the consumer's code changed. Check the whole app against a visual baseline, and check whether an explicit ancestor background or an explicit `contrastMode` was being relied on implicitly.
