---
summary: Fullscreen ids now end in a UUID instead of a short id
affectedExports:
  - createFullscreenId
  - useFullscreenId
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/createUniqueId.ts
  - packages/core/odyssey-react-mui/src/index.ts
  - packages/core/odyssey-react-mui/src/message-bus/fullscreen/createFullscreenId.ts
commit: 17bc37b0f2a43ed2d67f01ae4658ee7f0bfb5496
onlyRelevantIf: the consumer snapshots or matches fullscreen ids, or runs fullscreen code where Web Crypto is missing
---

Fullscreen ids changed from `odyssey-fullscreen-` plus a 6-character random id to `odyssey-fullscreen-` plus a UUID v4, such as `odyssey-fullscreen-3f2b8c1e-9a4d-4e7f-b2c6-1d5e8f0a7b93`. That covers `createFullscreenId` on the `message-bus` subpath, `useFullscreenId`, and the app-area id `renderUiShell` creates at startup. The id reaches the DOM through `getFullscreenElementId`, as the region's `id` and the `aria-controls` of each `FullscreenButton`, so those attributes are longer and contain hyphens. Generating a fullscreen id now calls `crypto.randomUUID()`, or `crypto.getRandomValues()` where that is hidden, instead of `Math.random()`. Check snapshots, selectors, and patterns that assume the short form, and check that test environments rendering fullscreen components or `renderUiShell` provide `globalThis.crypto`. `createUniqueId()` and `useUniqueId()` keep the short id by default; `createUniqueId({ isUuid: true })` is a new opt-in.
