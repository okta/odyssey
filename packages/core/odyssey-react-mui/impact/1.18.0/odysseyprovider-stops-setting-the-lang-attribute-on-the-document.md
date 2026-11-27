---
summary: OdysseyProvider stops setting the lang attribute on the document
affectedExports:
  - OdysseyProvider
  - OdysseyTranslationProvider
files:
  - packages/odyssey-react-mui/src/OdysseyTranslationProvider.tsx
commit: 06f335c7f
---

The provider no longer writes the `lang` attribute onto `document.documentElement`. It previously set it to the hyphenated language code, or `en` when none was given. Odyssey's own CSS baseline selects its CJK, Greek, and Thai font stacks with `:lang()` rules, so those stacks stop being selected unless the consumer sets `lang` on the document themselves. Anything else keyed on the document language, such as hyphenation, spellcheck, or a screen reader's voice, is also affected. Whether this bites depends entirely on whether the consumer's own HTML already sets `lang`.
