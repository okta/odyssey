---
summary: Tab labels gain larger font size and padding, growing the tab strip
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e5bf6ef36
onlyRelevantIf: a tab strip whose width or height was tuned to the previous label metrics
---

Tab labels gained `fontSize: TypographySizeHeading6` and horizontal padding of Spacing1 where there was none, and the selected weight moved from TypographyWeightBodyBold to TypographyWeightHeading. Each tab is wider and taller than before. Check tab strips that fitted a fixed container or wrapped at a specific breakpoint.
