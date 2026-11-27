---
summary: Tile overflow menu button gains `tooltipText="Actions"`, an untranslated tooltip
affectedExports:
  - Tile
files:
  - packages/odyssey-react-mui/src/Tile.tsx
commit: 0417d3f0d
onlyRelevantIf: a Tile is rendered with menuButtonChildren
---

The Tile's overflow menu button gained `tooltipText="Actions"`, so a tooltip now appears on hover and focus and the button's accessible description changes. The string is not translated at this version.
