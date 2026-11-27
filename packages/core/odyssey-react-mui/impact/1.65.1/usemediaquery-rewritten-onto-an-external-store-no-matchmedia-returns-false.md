---
summary: "`useMediaQuery` rewritten onto an external store; no `matchMedia` returns false"
affectedExports:
  - useMediaQuery
files:
  - packages/core/odyssey-react-mui/src/theme/useMediaQuery.ts
commit: 361c97ac3
---

Media query matching was rewritten onto an external-store subscription, so a re-render after the query string changes reports the new match instead of the old state, and concurrent rendering cannot tear. The removed useState lazy initializer already read the real match on the first render, so first paint is unaffected. A missing `matchMedia` now returns false rather than throwing, which changes server-rendering and test-environment behavior, and a leading `@media` prefix in the query string is now stripped. Check components that branch on a media query during first paint.
