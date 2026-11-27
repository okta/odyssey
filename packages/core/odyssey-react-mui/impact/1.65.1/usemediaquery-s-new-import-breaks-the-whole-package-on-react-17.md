---
summary: "`useMediaQuery`'s new import breaks the whole package on React 17"
affectedExports:
  - Dialog
  - SideNav
  - UiShell
  - renderUiShell
  - useMediaQuery
files:
  - packages/core/odyssey-react-mui/src/theme/useMediaQuery.ts
commit: 361c97ac3
onlyRelevantIf: the consumer runs React 17 or older, which is below the declared peer range of `^18.3.1` and so is an unsupported configuration
---

`useMediaQuery` imports `useSyncExternalStore` from `react`, which does not exist before React 18, and the barrel re-exports the module, so the reach is the whole package rather than only the components that call the hook. Where the failure lands depends on how the consumer's toolchain treats a missing named export from a CommonJS module, and React 17 ships CommonJS only. Node's own ESM loader and Vite reject the link before any module body runs, so importing anything from the package fails outright with a named-export SyntaxError. Webpack 5 cannot statically verify a named import from CommonJS, reports it under `importExportsPresence`, which defaults to a warning, and compiles the reference to `undefined`, so a TypeError lands on the first render that calls the hook instead; a project that sets `strictExportPresence` gets a build error. That webpack branch follows from the bundler's documented default rather than from an observed run, and it is the branch a React 17 consumer is most likely to be reading, since a codebase still on React 17 is unlikely to be on Vite. A consumer resolving the `require` condition also fails at the call site rather than at load, because the CommonJS build compiles the import to a property access. 1.65.2 repairs it by importing the backport shim instead. A consumer inside the declared peer range is unaffected.
