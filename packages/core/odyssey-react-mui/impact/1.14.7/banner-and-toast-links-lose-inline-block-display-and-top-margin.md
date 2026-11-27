---
summary: Banner and Toast links lose inline-block display and top margin
affectedExports:
  - Banner
  - Toast
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 9c3cd910f
onlyRelevantIf: a Banner or Toast is given linkUrl
---

The removed rule lived on `MuiAlert.styleOverrides.message` with no variant condition, so it applied to the banner and toast variants too, not only the callout it was removed for. A Banner's or Toast's link loses `display: inline-block` and its Spacing5 top margin and gets no replacement, because the new spacing container is inside Callout only. Check the vertical position of the link in both.
