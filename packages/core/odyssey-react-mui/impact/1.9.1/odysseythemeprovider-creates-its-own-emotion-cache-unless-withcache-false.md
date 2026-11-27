---
summary: "`OdysseyThemeProvider` creates its own Emotion cache unless `withCache={false}`"
affectedExports:
  - OdysseyThemeProvider
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
commit: 872f24c65
onlyRelevantIf: OdysseyThemeProvider is used directly rather than through OdysseyProvider
---

OdysseyThemeProvider now creates its own Emotion cache and wraps its children in a `CacheProvider` unless `withCache={false}` is passed, which OdysseyProvider does. A consumer who supplied their own CacheProvider above it is now overridden, style insertion order changes, and the generated class-name prefix is a fresh random id.
