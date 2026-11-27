---
summary: External Link renders hidden text before its icon, changing accessible name
affectedExports:
  - Link
files:
  - packages/core/odyssey-react-mui/src/Link.tsx
commit: 256b78cf5
onlyRelevantIf: a Link that opens in a new window
---

An external link now renders visually hidden screen-reader text before its icon, which changes the link's accessible name. In English the name gains the suffix " Opens in a new tab", so `getByRole('link', { name: 'Help' })` must become `getByRole('link', { name: 'Help Opens in a new tab' })`. The text comes from the `link.external.newwindow` translation, so it differs in other locales. This also reaches links your own components render through Odyssey's `Link` with `target="_blank"`. Check accessibility snapshots, and check tests that matched an external link by its exact accessible name.
