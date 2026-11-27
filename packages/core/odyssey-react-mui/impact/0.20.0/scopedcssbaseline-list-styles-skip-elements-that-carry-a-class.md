---
summary: ScopedCssBaseline list styles skip elements that carry a class
affectedExports:
  - odysseyTheme
  - ScopedCssBaseline
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 535995ef5
onlyRelevantIf: you render lists with a className inside a <ScopedCssBaseline>
---

The ScopedCssBaseline list selectors were narrowed from ul, ol and li to ul:not([class]), ol:not([class]) and li:not([class]). A list that carries any class attribute, which includes every MUI List and anything you style with a class or a CSS-in-JS library, stops receiving the baseline list margins, padding and marker styling. Check lists inside a ScopedCssBaseline that were relying on those defaults.
