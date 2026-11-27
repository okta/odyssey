---
summary: Dialog and temporary Drawer now render inside a nested `OdysseyProvider`
affectedExports:
  - Dialog
  - Drawer
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/src/Dialog.tsx
  - packages/core/odyssey-react-mui/src/Drawer.tsx
  - packages/core/odyssey-react-mui/src/FullScreenOverlay.tsx
  - packages/core/odyssey-react-mui/src/OdysseyProvider.tsx
commit: c7f87461f
---

Every Dialog, and every Drawer with the temporary variant, now renders inside a second nested OdysseyProvider. That nested provider builds its own Emotion cache, theme provider, and translation provider. It does not receive `nonce`, `stylisPlugins`, `languageCode`, or `translationOverrides` from the outer provider. Check overlay styling under a Content Security Policy, overlay styling if the app passes custom stylis plugins, and overlay text if the app sets a language or overrides translations at the provider. Persistent and permanent Drawers are not wrapped, so they and temporary Drawers can now behave differently.
