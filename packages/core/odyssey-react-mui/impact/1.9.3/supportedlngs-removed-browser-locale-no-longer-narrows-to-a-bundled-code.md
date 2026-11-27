---
summary: "`supportedLngs` removed; browser locale no longer narrows to a bundled code"
affectedExports:
  - odysseyTranslate
  - OdysseyTranslationProvider
files:
  - packages/odyssey-react-mui/src/i18n.ts
commit: d1dfde6c9
onlyRelevantIf: the active language is left to the browser, or `i18n.language` is read back
---

`supportedLngs` was removed from the i18next init, so a browser locale is no longer narrowed to one of Odyssey's bundled codes before becoming the active language. With `load: "currentOnly"`, a visitor on `en-US` now leaves `i18n.language` at `en-US` and reaches English only through `fallbackLng`, where before the language itself resolved to `en`. Check anything that reads `i18n.language`, and plural or number formatting that resolves against it.
