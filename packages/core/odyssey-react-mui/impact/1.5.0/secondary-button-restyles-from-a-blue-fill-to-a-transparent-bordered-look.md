---
summary: Secondary Button restyles from a blue fill to a transparent, bordered look
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: db5c74330
---

The secondary Button was restyled from a blue-tinted fill (HueBlue100 background, PalettePrimaryDark text) to transparent with a HueNeutral300 border and body-coloured text. Hover, active and disabled states all changed with it. On a coloured surface a secondary button now shows that surface through, and its contrast against the background is the consumer's to check.
