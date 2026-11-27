---
summary: Button label font switches to the heading typeface
affectedExports:
  - Button
  - MenuButton
  - Dialog
  - Toast
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
---

Button labels now render in a different typeface. The root gained `fontFamily: TypographyFamilyButton`, which aliases `TypographyFamilyHeading` and puts Aeonik ahead of Inter; there was no `fontFamily` on the block before, so labels inherited the body family. If Aeonik is served, every button label's glyph widths change and label-driven button widths move with them. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:362-378 has no fontFamily; v1.0.0 components.tsx:330.
