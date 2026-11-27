---
summary: Button isFullWidth prop works again outside Tile
affectedExports:
  - Button
files:
  - packages/odyssey-react-mui/src/Button.tsx
commit: aacd2eeb6
onlyRelevantIf: a Button is given isFullWidth outside a Tile
---

`fullWidth` is read from the already-resolved `isFullWidth` memo again instead of `buttonContext.isFullWidth ?? isFullWidth`. The `isFullWidth` prop starts working again after being ignored from 1.14.0 through 1.15.2, so a button that was quietly staying at its intrinsic width now stretches. Check layouts that were adjusted to compensate while the prop was dead.
