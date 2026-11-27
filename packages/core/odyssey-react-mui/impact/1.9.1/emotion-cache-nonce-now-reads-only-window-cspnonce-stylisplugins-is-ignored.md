---
summary: Emotion cache nonce now reads only `window.cspNonce`; `stylisPlugins` is ignored
affectedExports:
  - OdysseyProvider
  - OdysseyCacheProvider
files:
  - packages/odyssey-react-mui/src/OdysseyCacheProvider.tsx
commit: 872f24c65
onlyRelevantIf: "`nonce` or `stylisPlugins` is passed to OdysseyProvider or OdysseyCacheProvider, for example a CSP nonce or an RTL plugin"
---

OdysseyCacheProvider stopped reading `nonce`, `stylisPlugins`, and `shadowDomElement` from its props. The Emotion cache now always takes its nonce from `window.cspNonce` and carries no stylis plugins, so under a CSP that only accepts a nonce the page loses every Odyssey style, and a direction plugin stops transforming anything. The cache also gained `speedy: false`, which inserts rules as text nodes rather than through `insertRule`, changing what is visible in the stylesheet. 1.9.2 restores `nonce` and `stylisPlugins` here, but OdysseyThemeProvider still ignores both.
