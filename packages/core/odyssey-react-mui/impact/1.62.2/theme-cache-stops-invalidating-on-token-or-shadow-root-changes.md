---
summary: Theme cache stops invalidating on token or shadow root changes
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
files:
  - packages/core/odyssey-react-mui/src/useThemeCache.ts
commit: a4cc9b2c0
onlyRelevantIf: "`designTokensOverride` or `shadowRootElement` is passed to OdysseyProvider or OdysseyThemeProvider"
---

The theme cache stopped invalidating when tokens or the shadow root change, so a theme built from the first render's values is reused and later changes do not reach rendered output. To tell whether this reaches you, search the app for `designTokensOverride` and `shadowRootElement`. Neither prop passed means nothing is affected. Either one passed a value defined at module scope and never reassigned is also unaffected, because the first build is the only one needed. What breaks is a value that changes after mount or is rebuilt per render: an object literal written inline in JSX, one derived from state or context, or a shadow root captured from a ref. Those keep the first render's theme for the life of the provider. Commit `9aca76960` restored the invalidation in 1.63.0, and 1.62.2 is an ancestor of 1.63.0, so an upgrade that passes through 1.62.2 to any later version carries the fix; only an upgrade landing exactly on 1.62.2 is affected. Check runtime token switching, including any light and dark or branding toggle.
