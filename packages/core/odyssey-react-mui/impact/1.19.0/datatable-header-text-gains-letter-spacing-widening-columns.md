---
summary: DataTable header text gains letter spacing, widening columns
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 68bce285f
---

Table header cells gained letterSpacing: 1.3, which Emotion serializes as 1.3px because letterSpacing is not a unitless property. Header text is wider than before, so intrinsic column widths and the point at which headers wrap or truncate both move. The fontSize swap in the same hunk, from the literal 0.71428571rem to TypographySizeOverline, is not a change: the token's value is 0.7142857143rem.
