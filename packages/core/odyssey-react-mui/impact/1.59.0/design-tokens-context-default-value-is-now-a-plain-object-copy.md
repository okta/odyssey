---
summary: Design tokens context default value is now a plain object copy
affectedExports:
  - OdysseyDesignTokensContext
  - useOdysseyDesignTokens
files:
  - packages/core/odyssey-react-mui/src/OdysseyDesignTokensContext.tsx
commit: 7e09c12d1
onlyRelevantIf: the consumer coerces or introspects the design tokens context value, for example passing it to `String()`
---

The default context value is now a plain object copy rather than the module namespace object, so it has a normal prototype and primitive coercion no longer throws. Check code that introspected or coerced that value.
