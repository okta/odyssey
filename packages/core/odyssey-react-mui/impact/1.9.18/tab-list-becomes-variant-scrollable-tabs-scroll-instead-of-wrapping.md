---
summary: Tab list becomes `variant="scrollable"`; tabs scroll instead of wrapping
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/Tabs.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e4eb22169
---

The tab list is now variant="scrollable", and the bottom border moved from the flex container to the scroller. Tabs that used to reflow onto a second line now stay on one line and scroll, with scroll buttons appearing at the edges. The scroll buttons' fade masks are hardcoded white gradients, so they show as a white smear on any non-white surface. Check tab strips that relied on wrapping, and tab strips on tinted or dark backgrounds.
