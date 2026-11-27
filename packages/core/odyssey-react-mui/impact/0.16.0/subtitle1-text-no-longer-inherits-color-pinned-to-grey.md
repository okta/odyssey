---
summary: "`subtitle1` text no longer inherits color, pinned to grey"
affectedExports:
  - odysseyTheme
  - FormHelperText
  - Typography
files:
  - packages/odyssey-react-mui/src/theme/typography.ts
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ba06723a0
---

typography.subtitle1 gained an explicit grey colour, #6e6e78, where it previously inherited, and MuiFormHelperText's font size is now pinned to the subtitle1 size, 0.857rem, rather than inherited. Check subtitle1 text on a coloured or dark background, where it no longer picks up the surrounding colour, and helper text you had sized yourself.
