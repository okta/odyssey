---
summary: "`ariaDescribedBy`, `ariaLabel`, `ariaLabelledBy` now emit real aria attributes"
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
  - packages/odyssey-react-mui/src/Typography.tsx
commit: 1bffb3bca
---

ariaDescribedBy, ariaLabel and ariaLabelledBy were being handed to MuiTypography under those camelCase names, which React dropped as unknown DOM props. They are now emitted as real aria-describedby, aria-label and aria-labelledby attributes, so an accessible name or description supplied to a Typography takes effect for the first time and can override the element's own text.
