---
summary: Provider writes `lang` onto the host page's `<html>` element, defaulting to "en"
affectedExports:
  - OdysseyProvider
  - OdysseyTranslationProvider
files:
  - packages/odyssey-react-mui/src/OdysseyTranslationProvider.tsx
commit: 7d0abdf32
---

The provider now writes `lang` onto `window.document.documentElement`, defaulting to "en". That is the host page's `<html>` element, outside anything Odyssey renders. An app that set `lang` itself, or that hosts Odyssey alongside non-Odyssey content in another language, has its document-level language overwritten, which moves `:lang()` rules, spell checking, and screen-reader pronunciation for the whole page.
