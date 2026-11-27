---
summary: Underscore `languageCode` values get hyphenated, matching no registered bundle
affectedExports:
  - OdysseyProvider
  - OdysseyTranslationProvider
files:
  - packages/odyssey-react-mui/src/OdysseyTranslationProvider.tsx
commit: 7d0abdf32
onlyRelevantIf: "`languageCode` is passed with an underscore, which is the form Odyssey's own Chinese bundles use"
---

`languageCode` is now rewritten with `replaceAll("_", "-")` before `i18n.changeLanguage`, while the resource bundles are still registered under `zh_CN` and `zh_TW`. `zh_CN` becomes `zh-CN`, which matches no bundle, so those users fall back to English. Check any locale code passed in with an underscore.
