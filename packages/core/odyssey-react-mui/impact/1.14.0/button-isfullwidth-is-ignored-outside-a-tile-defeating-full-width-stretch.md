---
summary: Button `isFullWidth` is ignored outside a `Tile`, defeating full-width stretch
affectedExports:
  - Button
files:
  - packages/odyssey-react-mui/src/Button.tsx
commit: 0417d3f0d
onlyRelevantIf: a Button is given isFullWidth outside a Tile
---

`fullWidth` is now read as `buttonContext.isFullWidth ?? isFullWidth`. ButtonContext's default value is `{ isFullWidth: false }`, not `undefined`, so `??` never falls through and the `isFullWidth` prop is ignored for every Button that is not inside a Tile. Check any button that was relying on `isFullWidth` to stretch. This is reverted at 1.15.3.
