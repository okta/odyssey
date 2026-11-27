---
summary: Link default text decoration changes from underline to none
affectedExports:
  - Link
  - Banner
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: a0cfac0ff
---

MuiLink's textDecoration changed from underline to none, so links are no longer underlined in their resting state. In running prose a link is now distinguished by colour alone, which is the consumer's contrast and colour-reliance problem to assess. The .Link-icon and .Link-indicator margins also dropped from Spacing2 to Spacing1, so a link with an icon or an external-link indicator is narrower.
