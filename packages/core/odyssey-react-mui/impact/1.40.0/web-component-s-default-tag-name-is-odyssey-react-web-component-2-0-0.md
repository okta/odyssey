---
summary: Web component's default tag name is `odyssey-react-web-component-2-0-0`
affectedExports:
  - getReactWebComponent
  - renderReactInWebComponent
  - versionedWebComponentName
files:
  - packages/odyssey-react-mui/src/web-component/odysseyWebComponentVersion.generated.ts
commit: 54e0ca32d
onlyRelevantIf: the consumer renders Odyssey through the web component entry point and leaves `webComponentName` unset
---

At this version the default custom element tag is `odyssey-react-web-component-2-0-0`, not `-1-40-0`. The tag name is not derivable from the release version at this release, so check any selector that derives it.
