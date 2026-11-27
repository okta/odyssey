---
summary: MUI Card, CardActionArea, CardActions gain new theme overrides for Tile
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
  - Tile
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c5aa957ab
onlyRelevantIf: MUI's Card, CardActionArea, or CardActions is rendered inside the Odyssey theme
---

The theme gained `MuiCard`, `MuiCardActionArea`, and `MuiCardActions` overrides to support the new Tile. Odyssey does not export Card, so this reaches a consumer only through their own `@mui/material` Card rendered under the Odyssey provider, and it is not visible in their diff. The overrides set a white background, BorderRadiusOuter, DepthMedium, Spacing5 padding, a fixed 64px height on every `img` inside the card, and restyle nested Typography h5, subtitle2, and body1, including uppercasing subtitle2. CardActionArea gets negative Spacing5 margins with a compensating width, and its hover focus highlight is hidden. Check any hand-styled MUI Card in the application, especially one holding images or a subtitle.
