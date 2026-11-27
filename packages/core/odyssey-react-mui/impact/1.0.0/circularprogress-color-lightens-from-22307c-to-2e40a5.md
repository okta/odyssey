---
summary: "CircularProgress color lightens from #22307c to #2e40a5"
affectedExports:
  - CircularProgress
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a CircularProgress with any color other than inherit, which is the default
---

The spinner colour lightened from #22307c to #2e40a5. The block previously read `theme.palette.primary.dark`, which resolves to `ColorPaletteBlue900`; it now reads `odysseyTokens.PalettePrimaryDark`, which is `HueBlue700`. Note these are not the same thing at v1.0.0: `theme.palette.primary.dark` there is `HueBlue900` #182257. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:633-637; v1.0.0 components.tsx:773-777.
