---
summary: MenuItem loses its `displayName`, appears as anonymous
affectedExports:
  - MenuItem
files:
  - packages/odyssey-react-mui/src/MenuItem.tsx
commit: 1f47d2324
onlyRelevantIf: snapshot tests or React DevTools inspection that name the MenuItem component
---

The explicit displayName was removed from the memoized MenuItem, so the component reports as an anonymous memo/forwardRef pair instead of "MenuItem". Snapshot output changes. The displayName is restored at 0.24.0.
