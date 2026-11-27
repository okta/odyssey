---
summary: "`react-i18next` minimum version raised to `^15.7.3`"
affectedExports:
  - OdysseyProvider
  - OdysseyTranslationProvider
files:
  - packages/core/odyssey-react-mui/package.json
commit: 2fdac63a8
---

Odyssey's `react-i18next` range moved from `^15.1.1` to `^15.7.3`. It was already a regular dependency, so what changed is the minimum version. An app that pins `react-i18next` below 15.7.3 can no longer share Odyssey's copy and ends up with two instances holding separate translation state. Check the resolved tree for a duplicate.
