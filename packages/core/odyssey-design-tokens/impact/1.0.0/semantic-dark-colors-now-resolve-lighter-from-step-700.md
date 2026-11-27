---
summary: Semantic dark colors now resolve lighter, from step 700
affectedExports:
  - HueNeutral300
  - HueNeutral400
  - HueNeutral700
  - HueNeutral800
  - PalettePrimaryDark
  - PaletteDangerDark
  - PaletteWarningDark
  - PaletteSuccessDark
files:
  - packages/odyssey-design-tokens/src/hue.json
  - packages/odyssey-design-tokens/src/palette.json
  - packages/odyssey-design-tokens/src/typography.json
  - packages/odyssey-design-tokens/src/border.json
commit: 8f19d3045
---

The hue ramps gained steps that did not exist before (neutral 300, 400, 700, 800; per-colour 100, 600, 700, 800), and the semantic palette was rebuilt on top of them. palette.*.dark now resolves to hue.*.700 where the old theme's dark slot came from the 900 step, so semantic dark colours are lighter than the value they replace. The neutral values that the react-mui theme had hardcoded (#c1c1c8, #aaaab4, #585862, #41414b) were replaced by the new tokens (#cbcbcb, #aeaeae, #4b4b4b, #383838), so greys shifted.
