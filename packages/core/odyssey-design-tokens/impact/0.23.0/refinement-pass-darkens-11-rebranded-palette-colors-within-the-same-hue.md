---
summary: Refinement pass darkens 11 rebranded palette colors within the same hue
affectedExports:
  - ColorPaletteNeutral600
  - ColorPaletteBlue300
  - ColorPaletteBlue500
  - ColorPaletteBlue900
  - ColorPaletteGreen500
  - ColorPaletteGreen600
  - ColorPaletteGreen900
  - ColorPaletteRed500
  - ColorPaletteRed900
  - ColorPaletteYellow500
  - ColorPaletteYellow900
  - ColorNeutralBase
  - ColorTextSub
  - ColorPrimaryLight
  - ColorBackgroundPrimaryBase
  - ColorPrimaryBase
  - ColorTextPrimary
  - ColorBorderPrimaryBase
  - ColorPrimaryDark
  - ColorBackgroundPrimaryDark
  - ColorBorderPrimaryDark
  - ColorSuccessBase
  - ColorBackgroundSuccessDark
  - ColorDangerBase
  - ColorBackgroundDangerDark
  - ColorTextDanger
  - ColorBorderDangerBase
  - ColorDangerDark
  - ColorBorderDangerDark
  - ColorCautionBase
  - ColorBackgroundCautionDark
  - ColorCautionDark
files:
  - packages/odyssey-design-tokens/src/color/palette.json
  - packages/odyssey-design-tokens/src/color/background.json
  - packages/odyssey-design-tokens/src/color/border.json
  - packages/odyssey-design-tokens/src/color/functional.json
  - packages/odyssey-design-tokens/src/color/text.json
commit: ef381d0d7
---

A refinement pass over the rebranded palette, landing in the same release as the rebrand itself. Eleven values move, all darkenings within the same hue: neutral 600 `#707070` to `#6E6E6E`, blue 300 `#C1C9F6` to `#9DAAF1`, blue 500 `#546BE7` to `#4C64E1`, blue 900 `#2E40A5` to `#22307C`, green 500 `#16884A` to `#197F48`, green 600 `#158046` to `#0E562F`, green 900 `#0E562F` to `#0A4023`, red 500 `#E72500` to `#D92300`, red 900 `#951800` to `#711200`, yellow 500 `#A16C03` to `#986603`, yellow 900 `#664402` to `#4C3302`. No key is added or renamed. Seventeen palette values are untouched, including every 000 step, every 300 step outside blue, neutral 500 and 900, orange 500, both turquoise steps and purple 500. Green 600's new value is green 900's old value, so a raw diff makes green 900 look unchanged when both moved. Twenty-one derived tokens resolve through the moved values and move with them, among them ColorTextPrimary, ColorTextDanger, ColorTextSub, ColorPrimaryBase and ColorSuccessBase. Green 900 has no alias, so its move reaches only a consumer reading the palette token directly. Re-check any contrast ratio measured against the old values, and any text placed on a palette background.
