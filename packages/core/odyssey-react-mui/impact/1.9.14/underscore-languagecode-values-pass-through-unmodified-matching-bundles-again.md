---
summary: Underscore `languageCode` values pass through unmodified, matching bundles again
affectedExports:
  - OdysseyTranslationProvider
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/OdysseyTranslationProvider.tsx
commit: c832fd88e
onlyRelevantIf: languageCode is passed to OdysseyTranslationProvider or OdysseyProvider in underscore form, such as pt_BR, zh_CN, zh_TW, nl_NL, ok_PL, or ok_SK
---

The provider used to hyphenate the language code before handing it to i18next, but Odyssey's own resource bundles are keyed with underscores and i18next runs with load: "currentOnly". An underscore code therefore matched no bundle and fell back to English. It is now passed through unmodified, so those six locales resolve and Odyssey's built-in strings render translated for the first time. translationOverrides keyed the same way start applying too. The html lang attribute is still set from the hyphenated form, so it did not change. Check string lengths and layout in those locales.
