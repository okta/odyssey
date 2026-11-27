---
summary: "`nonce` and `stylisPlugins` props on `OdysseyCacheProvider` are honored again"
affectedExports:
  - OdysseyProvider
  - OdysseyCacheProvider
files:
  - packages/odyssey-react-mui/src/OdysseyCacheProvider.tsx
commit: 420d9f55d
onlyRelevantIf: "`nonce` or `stylisPlugins` is passed and 1.9.1 ignored it"
---

OdysseyCacheProvider reads `nonce` and `stylisPlugins` again, falling back to `window.cspNonce`. Styles that a CSP rejected on 1.9.1 are served again, and a direction plugin resumes transforming, which can move layout back across the board. `shadowDomElement` is still not used to build the Emotion root; `emotionRoot` is the prop that does that.
