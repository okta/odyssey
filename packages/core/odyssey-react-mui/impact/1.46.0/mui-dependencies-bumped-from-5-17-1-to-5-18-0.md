---
summary: MUI dependencies bumped from `^5.17.1` to `^5.18.0`
affectedExports:
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/package.json
commit: c7f87461f
---

`@mui/material`, `@mui/system`, and `@mui/icons-material` moved from `^5.17.1` to `^5.18.0` as regular dependencies. Every consumer's install tree picks up the new minor. Check for duplicated MUI copies if the app depends on MUI directly, because two instances of the styling engine break theme and cache sharing.
