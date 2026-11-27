---
summary: Banner's default `Learn more` link text is removed
affectedExports:
  - Banner
files:
  - packages/odyssey-react-mui/src/Banner.tsx
commit: 6bdb0eea3
onlyRelevantIf: you pass linkUrl to Banner without also passing linkText
---

Banner's linkText default of "Learn more" was removed. Both props stay optional, so your source still compiles, and a Banner given a linkUrl with no linkText now renders a link with no text: an empty target that is focusable but has no accessible name. Check every Banner that supplies a URL. This hash is the 0.19.0 squash merge, not a commit for this change alone.
