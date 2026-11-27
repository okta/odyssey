---
summary: "`i18next` and `react-i18next` dropped as regular dependencies"
affectedExports:
  - OdysseyProvider
  - OdysseyTranslationProvider
  - odysseyTranslate
files:
  - packages/core/odyssey-react-mui/package.json
commit: f3e5d4300
onlyRelevantIf: the consumer also depends on `i18next` or `react-i18next` directly, or relied on Odyssey's copy being present in the tree
---

`i18next` and `react-i18next` were dropped as regular dependencies and the translation runtime moved to generated modules. The `sideEffects` entry for the old translation module was removed with them, which changes what a bundler may tree-shake. Both packages remain in the tree transitively, through the `@okta/odyssey-contribution-tooling` dependency the same commit added, which pins `react-i18next` to exactly `15.4.1`, below the `^15.7.3` that 1.45.0 had just raised it to. A duplicate copy is therefore guaranteed for an app on any other 15.x. Odyssey also stops calling `i18next.init()` at module scope here, which it had done on every release since 0.24.0, so an app whose own i18next setup was incomplete because Odyssey was silently filling it in loses that. Check that translations still load, in your app as well as in Odyssey's components, and check the resolved tree. Commit `4d242e9cb` reverted this in 1.45.3, but 1.45.3 is not an ancestor of 1.46.0, so the revert reached that one release only and the change is live again from 1.46.0 onward. Treat it as in effect for any upgrade landing at 1.46.0 or above.
