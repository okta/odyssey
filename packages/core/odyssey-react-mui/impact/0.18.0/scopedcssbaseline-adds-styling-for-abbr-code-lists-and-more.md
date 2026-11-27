---
summary: ScopedCssBaseline adds styling for abbr, code, lists, and more
affectedExports:
  - odysseyTheme
  - ScopedCssBaseline
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 944a76c8d
onlyRelevantIf: you render <ScopedCssBaseline>
---

MuiScopedCssBaseline gained about 320 lines of element styling for plain HTML inside its subtree: abbr, address, blockquote, cite, code, del, details, dfn, dl, figure, lists, and more. Any unstyled markup you render inside a ScopedCssBaseline now picks up Odyssey's typography, margins and borders. Check content you render from markdown or a CMS. This hash is the 0.18.0 squash merge, not a commit for this change alone.
