---
summary: Autocomplete end adornment icons shift position, MUI version bumped
affectedExports:
  - Autocomplete
  - GroupPicker
  - VirtualizedAutocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/package.json
commit: 3958109c4
onlyRelevantIf: an Autocomplete is rendered
---

`MuiAutocomplete.endAdornment` gained `transform: "none"` to cancel a vertical translate MUI added in 5.15.12, so the clear and dropdown icons shift position. The same release moved `@mui/material` from `^5.15.10` to `^5.15.12` and `@emotion/react` from `^11.11.3` to `^11.11.4`. Both ranges are carets and MUI ships as a regular dependency rather than a peer, so a consumer who was pinned at 5.15.10 by a lockfile now moves up and anything they build directly on MUI moves with it.
