---
summary: CircularProgress drops most props; `value={0}` is now indeterminate
affectedExports:
  - CircularProgress
files:
  - packages/odyssey-react-mui/src/CircularProgress.tsx
  - packages/odyssey-react-mui/src/index.ts
commit: 81dca4a0b
onlyRelevantIf: a CircularProgress that was passed size, thickness, color or variant, or value={0}
---

CircularProgress stopped being MUI's component re-exported and became a wrapper that accepts only value. Every other MUI prop is dropped rather than forwarded, and variant is now derived from value, so value={0} renders the indeterminate spinner.
