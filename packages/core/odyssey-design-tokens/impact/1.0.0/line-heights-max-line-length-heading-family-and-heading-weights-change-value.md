---
summary: Line heights, max line length, heading family, and heading weights change value
affectedExports:
  - TypographyLineHeightBody
  - TypographyLineHeightUi
  - TypographyLineHeightHeading1
  - TypographyLineHeightHeading2
  - TypographyLineHeightHeading3
  - TypographyLineHeightHeading4
  - TypographyLineHeightHeading5
  - TypographyLineHeightHeading6
  - TypographyLineLengthMax
  - TypographyFamilyHeading
  - TypographyFamilyMono
  - TypographyWeightHeading
  - TypographyWeightHeadingBold
files:
  - packages/odyssey-design-tokens/src/typography.json
  - packages/odyssey-design-tokens/src/font.json
commit: 8f19d3045
---

Beyond the rename, real typographic values changed. Every line height moved: body 1.42857143 to 1.5, ui 1.14285714 to 1.2, heading1 1.25 to 1.2, heading2 1.28571429 to 1.2, heading3 1.28 to 1.25, heading4 1.27272727 to 1.25, heading5 1.33333333 to 1.3, heading6 1.25 to 1.3. Max line length went from 32rem to 55ch, which is viewport-independent but font-dependent, so measured column widths change. A separate heading family was introduced with 'Aeonik' at the front of the stack, and the mono family gained 'Roboto Mono' at the front; neither font ships with the package, so what renders depends on what the app serves. Heading weights split into 500 and 700 where there was one bold at 600.
