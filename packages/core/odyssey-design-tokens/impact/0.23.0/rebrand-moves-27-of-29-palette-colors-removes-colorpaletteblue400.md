---
summary: Rebrand moves 27 of 29 palette colors, removes `ColorPaletteBlue400`
affectedExports:
  - ColorPaletteNeutral000
  - ColorPaletteNeutral100
  - ColorPaletteNeutral200
  - ColorPaletteNeutral500
  - ColorPaletteNeutral600
  - ColorPaletteNeutral900
  - ColorPaletteBlue000
  - ColorPaletteBlue300
  - ColorPaletteBlue400
  - ColorPaletteBlue500
  - ColorPaletteBlue900
  - ColorPaletteGreen000
  - ColorPaletteGreen300
  - ColorPaletteGreen500
  - ColorPaletteGreen600
  - ColorPaletteGreen900
  - ColorPaletteRed000
  - ColorPaletteRed300
  - ColorPaletteRed500
  - ColorPaletteRed900
  - ColorPaletteYellow000
  - ColorPaletteYellow300
  - ColorPaletteYellow500
  - ColorPaletteYellow900
  - ColorPaletteOrange500
  - ColorPaletteTurquoise400
  - ColorPaletteTurquoise500
  - ColorPalettePurple500
files:
  - packages/odyssey-design-tokens/src/color/palette.json
  - packages/odyssey-design-tokens/src/color/background.json
  - packages/odyssey-design-tokens/src/color/border.json
  - packages/odyssey-design-tokens/src/color/functional.json
  - packages/odyssey-design-tokens/src/color/text.json
commit: 31454f721
---

The rebrand moved 27 of the 29 palette values and deleted one key. `ColorPaletteNeutralWhite` `#ffffff` is the only value that holds, so 29 keys go in and 28 come out. `ColorPaletteBlue400` `#788ee2` is removed outright, and an import of that name no longer resolves, which is a build failure rather than a colour change; nothing in the token source referenced `blue.400`, so only a consumer naming it directly is affected. Every other move keeps its key. Neutral: 000 `#f5f5f6` to `#F4F4F4`, 100 `#ebebed` to `#EDEDED`, 200 `#d7d7dc` to `#E1E1E1`, 500 `#8c8c96` to `#8D8D8D`, 600 `#6e6e78` to `#707070`, 900 `#1d1d21` to `#272727`. Blue: 000 `#f2f5ff` to `#F2F3FD`, 300 `#a7b5ec` to `#C1C9F6`, 500 `#1662dd` to `#546BE7`, 900 `#00297a` to `#2E40A5`. Green: 000 `#e5faf3` to `#DEFAE7`, 300 `#84d2b1` to `#7BE09E`, 500 `#00b478` to `#16884A`, 600 `#008055` to `#158046`, 900 `#00503c` to `#0E562F`. Red: 000 `#ffdfe2` to `#FFF0EE`, 300 `#f88c90` to `#FEBBAE`, 500 `#da372c` to `#E72500`, 900 `#640019` to `#951800`. Yellow: 000 `#faf5dc` to `#FCF6AC`, 300 `#f9dc77` to `#F9C503`, 500 `#ffc61c` to `#A16C03`, 900 `#663800` to `#664402`. Orange 500 `#e97107` to `#EF9B05`, turquoise 400 `#65adb7` to `#4CB7A3`, turquoise 500 `#2d8c9e` to `#096256`, purple 500 `#8d6e97` to `#4016A0`. Several of these change contrast direction rather than hue: green 500 and yellow 500 both move from a light saturated value to a dark one, so white text that passed on them now sits on a dark background and dark text fails. Alias tokens in color/background.json, color/border.json, color/functional.json and color/text.json resolve through the palette, so their values move with it. Re-check any contrast ratio measured against the old values, and any text placed on a palette background.
