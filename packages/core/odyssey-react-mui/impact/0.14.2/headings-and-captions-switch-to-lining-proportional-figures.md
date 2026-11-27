---
summary: Headings and captions switch to lining, proportional figures
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/typography.ts
commit: d91679779
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

`typography.allVariants` was introduced. MUI spreads it last inside its own per-variant builder, then lets the theme file's explicit per-variant object override it, so it reaches h1 through h6 and caption. The one declaration that changes rendering is `font-feature-settings: 'lnum', 'pnum'`: lining figures sit on the baseline at cap height instead of old-style figures that drop below it, and proportional figures each take their own width instead of every digit sharing one advance, so digits change shape and a stacked column of numbers stops aligning. The other three are inert: `fontFamily` restates the value those variants already carried and which MuiTypography also forces through defaultProps, `font-variant: normal` is that property's initial value, and `letter-spacing` moves from `initial` to `0`, which changes the computed value from `normal` to `0px` without changing spacing. The Odyssey-only `body` variant is not a MUI variant, so `allVariants` never reaches it; it gains the same font-feature settings written out longhand in this commit and keeps `letter-spacing: initial`. `subtitle1`, `subtitle2`, `body1`, `body2`, `button` and `overline` are pinned to `undefined` in the same file, which wipes MUI's built variant, so they carry nothing. Check digits in headings, captions and body text.
