---
summary: "`OdysseyThemeProvider` stops creating its own Emotion cache"
affectedExports:
  - OdysseyThemeProvider
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
commit: d7c8307ab
onlyRelevantIf: OdysseyThemeProvider is used directly rather than through OdysseyProvider
---

OdysseyThemeProvider no longer creates an Emotion CacheProvider. Styles now land in Emotion's default cache, which means no per-instance cache key, no `prepend: true`, no `nonce: window.cspNonce`, and no `speedy: false`. Check shadow DOM mounting, CSP nonce enforcement, and the cascade order between Odyssey's styles and the consumer's own stylesheet. OdysseyProvider is unaffected: it already wrapped OdysseyCacheProvider and already passed `withCache={false}`.
