---
summary: "`theme.shape.borderRadius` becomes the unitless string `4`"
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/shape.ts
commit: 871d2ffcc
---

theme.shape.borderRadius changed twice in this release. 871d2ffcc wrapped BorderRadiusBase in parseInt, turning the string "4px" into the number 4. 8f2066ed1 then replaced parseInt with a regex that strips non-digits, so the released value is the unitless string "4". MUI reads either form as pixels, so nothing Odyssey renders moves. A template literal or concatenation that reads theme.shape.borderRadius now produces "4" with no unit and the declaration is dropped. Check any style that interpolates it.
