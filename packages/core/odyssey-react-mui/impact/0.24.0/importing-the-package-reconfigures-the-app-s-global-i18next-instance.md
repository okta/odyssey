---
summary: Importing the package reconfigures the app's global i18next instance
affectedExports:
  - OdysseyProvider
  - OdysseyTranslationProvider
  - Banner
  - Infobox
  - Checkbox
  - TextField
  - PasswordField
  - SearchField
  - CheckboxGroup
  - RadioGroup
  - Select
  - NativeSelect
files:
  - packages/odyssey-react-mui/src/OdysseyI18n.ts
  - packages/odyssey-react-mui/src/OdysseyTranslationProvider.tsx
  - packages/odyssey-react-mui/src/index.ts
commit: d31de878b
onlyRelevantIf: the consumer's own app also uses i18next or react-i18next, on the shared default instance
recursUntil: 1.45.3
---

Importing anything from @okta/odyssey-react-mui reconfigures the consumer's own i18next. OdysseyI18n.ts calls i18n.use(initReactI18next).init(...) at module scope against i18next's shared default instance, not a private one, and the package barrel re-exports the module, so the call runs on import whether or not the app renders a translated component. It sets defaultNS, ns, keySeparator false, fallbackLng "en", load "currentOnly", supportedLngs, and interpolation escapeValue false with skipOnVariables false, overwriting whatever the app configured. The namespace value is not stable across the span: it is "translations" at 0.24.0 and "odyssey" by 1.45.1, so the symptom of a namespace clash differs by version. Separately, mounting OdysseyTranslationProvider, or OdysseyProvider which wraps it, without languageCode calls i18n.changeLanguage(window.navigator.language) on that same shared instance, switching the app's own translations to the browser language. Check whether the app owns a default i18next instance, and if so whether its namespace, key separator, fallback language and escaping survive. This behaviour holds unbroken from 0.24.0 through 1.45.1 and again at 1.45.3, so a consumer already above 0.24.0 was affected before this upgrade as well as after; 1.45.2 is the one release in the span where it does not hold, and it stops for good at 1.46.0.
