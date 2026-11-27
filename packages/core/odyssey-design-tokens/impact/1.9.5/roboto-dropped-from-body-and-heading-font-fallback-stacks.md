---
summary: "`'Roboto'` dropped from body and heading font fallback stacks"
affectedExports:
  - TypographyFamilyBody
  - TypographyFamilyHeading
  - TypographyFamilyButton
files:
  - packages/odyssey-design-tokens/src/typography.json
commit: 7d0abdf32
---

`'Roboto'` was dropped from the body and heading font stacks when they were rebuilt from four new part tokens. Body went from `'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif` to the same list without Roboto, and heading the same with `'Aeonik'` in front. `TypographyFamilyButton` aliases heading, so it changed too. On a platform where Roboto is the system face and Inter is not loaded, text now resolves to a different fallback.
