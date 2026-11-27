---
summary: Banner and Callout now render their link even without `linkUrl`
affectedExports:
  - Banner
  - Callout
  - Link
files:
  - packages/core/odyssey-react-mui/src/Banner.tsx
  - packages/core/odyssey-react-mui/src/Callout.tsx
  - packages/core/odyssey-react-mui/src/Link.tsx
commit: d7adb0a21
onlyRelevantIf: impact depends on the consumer's own props. Only a Banner or Callout given `linkText` without `linkUrl` gains an element, and only a Link given both `onClick` and a placeholder href changes behavior
---

Banner and Callout now render their link whenever `linkText` is set, falling back to `href="#"` when no `linkUrl` is given, where previously nothing rendered. Link also began calling `preventDefault` on click when it has an `onClick` and its href is `#` or empty. Check for a new anchor appearing in banners and callouts, and check navigation for links that relied on the placeholder href still navigating.
