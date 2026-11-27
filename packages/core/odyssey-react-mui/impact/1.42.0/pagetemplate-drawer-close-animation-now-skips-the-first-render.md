---
summary: PageTemplate drawer close animation now skips the first render
affectedExports:
  - PageTemplate
files:
  - packages/odyssey-react-mui/src/labs/PageTemplate/PageTemplate.tsx
commit: b15d7a597
---

PageTemplate's drawer close keyframes are now gated on the drawer being persistent, and are skipped on the first render when a persistent drawer mounts closed. Before this, the animation ran for every PageTemplate, including one with no drawer. Check whether your page renders a PageTemplate, and whether its first paint or any test that waited on a drawer animation is affected.
