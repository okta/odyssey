---
summary: "Package now declares `sideEffects: false`"
affectedExports:
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/package.json
commit: d69f6728e
---

The package now declares `sideEffects: false`, which tells a consumer's bundler it may drop any module it judges unused, including a module whose only purpose is a side effect. Check that styles, translations, and any polyfill still load in a production build, since a development build without tree-shaking will not show the difference.
