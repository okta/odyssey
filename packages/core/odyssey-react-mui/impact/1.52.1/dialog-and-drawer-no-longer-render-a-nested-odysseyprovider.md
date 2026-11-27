---
summary: Dialog and Drawer no longer render a nested `OdysseyProvider`
affectedExports:
  - Dialog
  - Drawer
  - OdysseyCacheProvider
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/src/FullScreenOverlay.tsx
commit: 1704a0cbc
onlyRelevantIf: the consumer does not set `shadowRootElement`, which is the path that lost the nested provider
---

Outside Shadow DOM, Dialog and Drawer stopped rendering a nested OdysseyProvider and now render inline under the app's own providers. That removes a second Emotion cache, a second theme provider, and one body-level div per overlay. Style injection order and specificity change with the cache, and overlays now inherit the app's contrast mode instead of being forced to high contrast: the nested provider rendered with no wrapper element, so background detection always fell through to the default gray and resolved to high contrast. Token and theme overrides were already inherited through the provider props context added in 1.46.0, so those are unchanged. This reverses most of the nesting introduced in 1.46.0. Check overlay styling, and check code that counted or selected body-level portal hosts.
