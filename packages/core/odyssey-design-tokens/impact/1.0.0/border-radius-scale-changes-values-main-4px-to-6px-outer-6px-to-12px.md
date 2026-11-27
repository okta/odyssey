---
summary: "Border radius scale changes values: main 4px to 6px, outer 6px to 12px"
affectedExports:
  - BorderRadiusMain
  - BorderRadiusTight
  - BorderRadiusOuter
  - BorderRadiusRound
  - BorderWidthHeavy
files:
  - packages/odyssey-design-tokens/src/border.json
commit: 8f19d3045
---

The border radius scale changed value as well as name: what was BorderRadiusBase at 4px is now BorderRadiusMain at 6px, and BorderRadiusOuter went from 6px to 12px. The old 4px is preserved under the new name BorderRadiusTight. Anything built to line up with a 4px corner, including an app's own nested elements inside an Odyssey card or input, no longer matches.
