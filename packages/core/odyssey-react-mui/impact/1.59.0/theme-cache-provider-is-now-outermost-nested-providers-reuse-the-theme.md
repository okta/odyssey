---
summary: Theme cache provider is now outermost, nested providers reuse the theme
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
files:
  - packages/core/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/core/odyssey-react-mui/src/useThemeCache.ts
commit: 7e09c12d1
onlyRelevantIf: impact depends on whether the consumer nests providers. A single top-level provider sees the caching change but not the inheritance change
---

A theme cache provider is now the outermost wrapper, and themes are built through a shared map so a nested provider reuses the parent's theme object rather than building an equal one. A nested provider with no `designTokensOverride` now takes the parent's tokens object itself, where it previously rebuilt an equal-valued copy from the inherited override, so identity-based memoization downstream sees fewer changes. Values differ only where the design tokens context was supplied directly rather than through an Odyssey provider. Check nested-provider subtrees against a baseline.
