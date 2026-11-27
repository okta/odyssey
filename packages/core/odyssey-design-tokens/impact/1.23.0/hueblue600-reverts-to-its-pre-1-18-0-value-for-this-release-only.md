---
summary: "`HueBlue600` reverts to its pre-1.18.0 value for this release only"
affectedExports:
  - HueBlue600
  - PalettePrimaryText
  - TypographyColorAction
files:
  - packages/odyssey-design-tokens/src/hue.json
commit: c6df499be
---

HueBlue600 reverted from #4c64e1 to #3f59e4, the value it had before 1.18.0, and 1.24.0 puts it back to #4C64E1. The exposure window is 1.23.0 exactly. `palette.primary.text` aliases hue blue 600 and `typography.color.action` aliases that, so PalettePrimaryText and TypographyColorAction, Odyssey's link and action text colour, carry the same one-release regression. Nothing else aliases blue 600: `palette.primary.main` and `palette.primary.dark` reference other hues, so the border and focus tokens built on them are unaffected. A consumer upgrading 1.22.0 to 1.23.0 sees link text shift; one upgrading straight from 1.22.0 to 1.24.0 or later sees nothing.
