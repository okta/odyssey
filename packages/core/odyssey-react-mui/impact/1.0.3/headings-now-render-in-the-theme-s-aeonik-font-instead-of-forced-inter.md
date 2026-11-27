---
summary: Headings now render in the theme's Aeonik font instead of forced Inter
affectedExports:
  - Typography
  - Heading1
  - Heading2
  - Heading3
  - Heading4
  - Heading5
  - Heading6
  - Paragraph
  - Subordinate
  - Support
  - Legend
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 1bffb3bca
---

MuiTypography's defaultProps fontFamily was removed. That default had been forcing the Inter stack onto every Typography, overriding the per-variant fontFamily the theme set, so headings and legends now actually render in the Aeonik stack the theme asks for. If Aeonik is not served, headings fall through to Inter and look unchanged; if it is, every heading changes typeface.
