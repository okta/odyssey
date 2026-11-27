---
summary: Web component's default tag name is `odyssey-react-web-component-1-45-3`
affectedExports:
  - getReactWebComponent
  - renderReactInWebComponent
  - versionedWebComponentName
files:
  - packages/core/odyssey-react-mui/src/web-component/odysseyWebComponentVersion.generated.ts
commit: 7bedff108
onlyRelevantIf: the consumer renders Odyssey through the web component entry point and leaves `webComponentName` unset
---

This release breaks the pattern of the recurring entry. The default custom element tag is `odyssey-react-web-component-1-45-3` here, not `-1-46-0`. The generator did run, and wrote the wrong value: `lerna.json` still read 1.45.2 at that point, so it stamped the next patch instead of the release version. An upgrade from 1.45.3 to 1.46.0 therefore does not change the tag. Read the value out of the built package rather than deriving it from the release version.
