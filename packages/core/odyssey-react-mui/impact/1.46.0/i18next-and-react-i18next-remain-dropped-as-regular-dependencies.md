---
summary: "`i18next` and `react-i18next` remain dropped as regular dependencies"
affectedExports:
  - OdysseyProvider
  - OdysseyTranslationProvider
  - odysseyTranslate
files:
  - packages/core/odyssey-react-mui/package.json
commit: f3e5d4300
onlyRelevantIf: the consumer also depends on `i18next` or `react-i18next` directly, or relied on Odyssey's copy being present in the tree
---

The dependency removal that shipped in 1.45.2 and was reverted in 1.45.3 is in effect again from this release, and stays in effect. No commit in this release introduces it. The removal is `f3e5d4300`, filed under 1.45.2 and an ancestor of this tag; this release branched off the 1.45.2 line and so never received the `4d242e9cb` revert, which reaches 1.45.3 only. `i18next` and `react-i18next` are not regular dependencies and the translation runtime comes from generated modules. This is also where Odyssey stops calling `i18next.init()` at module scope, permanently. From 0.24.0 through 1.45.1, and again in 1.45.3 alone, merely importing anything from the package configured the shared default i18next instance, and mounting the translation provider without `languageCode` called `changeLanguage(navigator.language)` on it. An app that was relying on that without knowing, because its own i18next setup was incomplete, gets nothing from this release onward. Check that translations still load, in your app as well as in Odyssey's components, and check for a now-unresolved `i18next` if the app imported it expecting Odyssey to provide it.
