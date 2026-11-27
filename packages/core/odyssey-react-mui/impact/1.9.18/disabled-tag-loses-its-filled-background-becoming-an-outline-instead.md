---
summary: Disabled Tag loses its filled background, becoming an outline instead
affectedExports:
  - Tag
  - TagList
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e4eb22169
onlyRelevantIf: a Tag is disabled
---

A disabled Tag lost its HueNeutral200 background and instead gets borderColor: BorderColorDisabled, and its delete icon is now HueNeutral300. The disabled state reads as an outline rather than a filled chip. Check contrast where tags sit on a tinted surface.
