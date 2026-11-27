---
summary: "`useMediaQuery` seeds its initial value from the real match, not false"
affectedExports:
  - useMediaQuery
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/theme/useMediaQuery.ts
commit: ac6a67fac
---

`useMediaQuery` now seeds its state from `matchMedia(...).matches` instead of `false`, so the first render reports the real match. Any first-render branch that assumed the query was false flips. This is also what stops UI Shell rendering nothing on first paint (see the 1.35.0 entry).
