---
summary: PageTemplate layout gap now applies on both axes, not just columns
affectedExports:
  - Layout
  - PageTemplate
files:
  - packages/core/odyssey-react-mui/src/labs/PageTemplate/Layout.tsx
commit: "037411710"
onlyRelevantIf: a PageTemplate whose layout content wraps onto more than one row
---

The layout container's gap went from column-only to both axes, so wrapped rows now have vertical spacing where they had none. Check multi-row layouts for added height. This change was not reverted in 1.45.2, unlike the z-index change from the same release.
