---
summary: CircularProgress default size, thickness, and color all change
affectedExports:
  - CircularProgress
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: "730e38919"
---

The spinner's defaults changed: `size` from TypographyScale2 to Spacing5, `thickness` from 8 to 10, and its colour from PalettePrimaryDark to PalettePrimaryMain. It is a different size and a lighter blue. The theme default reaches any MUI CircularProgress under OdysseyProvider, including the loading indicators inside the labs tables.
