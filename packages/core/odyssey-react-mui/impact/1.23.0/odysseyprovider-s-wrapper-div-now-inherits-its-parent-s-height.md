---
summary: OdysseyProvider's wrapper div now inherits its parent's height
affectedExports:
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
commit: 5b4ef43ef
---

OdysseyProvider's ScopedCssBaseline wrapper div now carries height: inherit. Where the provider's parent has an explicit height, the wrapper takes that height instead of sizing to its content, which can make the app area taller or introduce a scroll container that was not there. Where the parent has no height, inherit resolves to auto and nothing changes, so whether this matters depends entirely on the consumer's surrounding CSS.
