---
summary: Banner and Infobox prepend hidden severity text to their content
affectedExports:
  - Banner
  - Infobox
files:
  - packages/odyssey-react-mui/src/Banner.tsx
  - packages/odyssey-react-mui/src/Infobox.tsx
commit: 0f2adf731
---

Banner and Infobox now render a visually hidden <span> holding the severity word before their content, so the element's text content and accessible name both gained a prefix. Exact-text queries and snapshot assertions over these components change.
