---
summary: "`HueBlue600` restored, undoing the prior release's one-version regression"
affectedExports:
  - HueBlue600
  - PalettePrimaryText
files:
  - packages/odyssey-design-tokens/src/hue.json
commit: 8df7d02d1
---

HueBlue600 is restored from #3f59e4 to #4C64E1, undoing the 1.23.0 regression. PalettePrimaryText follows. This lands in the same commit as the field hint link restyling, so link color changes for two independent reasons at this version.
