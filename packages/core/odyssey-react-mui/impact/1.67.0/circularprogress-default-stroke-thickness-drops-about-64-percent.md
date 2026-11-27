---
summary: CircularProgress default stroke thickness drops about 64 percent
affectedExports:
  - CircularProgress
  - DataView
files:
  - packages/core/odyssey-react-mui/src/theme/components/CircularProgress.tsx
commit: ea5395cad
---

The spinner's default stroke thickness dropped from 10 to roughly 3.7 in the fixed 44-unit drawing space, which is about a 64 percent thinner ring, roughly 2 pixels instead of 5.5 at the default size. It is a theme default, so it reaches every spinner in the app, including ones rendered inside other Odyssey components, unless a thickness was passed explicitly. Check every loading state against a visual baseline.
