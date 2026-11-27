---
summary: Opening a Dialog or Drawer no longer resets the app's language
affectedExports:
  - Dialog
  - Drawer
  - OdysseyProvider
  - OdysseyTranslationProvider
files:
  - packages/core/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/core/odyssey-react-mui/src/ConditionalWrapper.tsx
  - packages/core/odyssey-react-mui/src/FullScreenOverlay.tsx
commit: "220126621"
onlyRelevantIf: the consumer sets `languageCode` on their provider and renders a Dialog or Drawer
---

`OdysseyProvider` now wraps its translation provider in a `ConditionalWrapper`, and `FullScreenOverlay` passes `hasTranslationProvider={false}`. There was only ever one module-scope i18n instance, which the package's own `useTranslation` passes explicitly, so overlay text always resolved from it and `translationOverrides` always reached overlays. What the removed nested provider actually did was call `changeLanguage(languageCode || window.navigator.language)` on that shared instance, resetting the language for the whole app whenever an overlay mounted. Check app-wide text after opening and closing a Dialog or Drawer in a non-default locale.
