---
summary: "`use-sync-external-store` shim added, fixing the React 17 load failure"
affectedExports:
  - Dialog
  - SideNav
  - useMediaQuery
files:
  - packages/core/odyssey-react-mui/package.json
  - packages/core/odyssey-react-mui/src/theme/useMediaQuery.ts
commit: 043fb2e51
---

`use-sync-external-store` was added as a regular dependency, and media query matching now goes through its shim instead of the React hook directly. The declared React peer range is `^18.3.1` here and at 1.65.1, and on React 18 the shim delegates to the built-in hook, so for every supported consumer the only change is one extra package in the dependency tree. It repairs the React 17 load failure that 1.65.1 introduced, which matters to a consumer running below the declared peer range. Check bundle contents and installed size.
