---
summary: "`HueYellow50` and `HueYellow100` become lighter and less saturated"
affectedExports:
  - HueYellow50
  - HueYellow100
  - PaletteWarningLighter
  - PaletteWarningHighlight
files:
  - packages/odyssey-design-tokens/src/hue.json
commit: 0eb84c3c0
---

HueYellow50 went from #fcf6ac to #fdfad9 and HueYellow100 from #fce101 to #ffe01a. Both are noticeably lighter and less saturated. palette.warning.lighter aliases yellow 50 and palette.warning.highlight aliases yellow 100, so PaletteWarningLighter and PaletteWarningHighlight move with them. Check contrast of anything the consumer draws on these, and any warning surface they built themselves from the hue tokens.
