---
summary: Unchecked radio in an error group no longer shows a red dot
affectedExports:
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 9fc6cef93
onlyRelevantIf: a RadioGroup renders in its error state
---

The `.Mui-error > &` rule no longer paints the radio's ::before dot in the error colour, so an unchecked radio in an error group shows an empty circle where it previously showed a filled red dot. The error border colour is unchanged.
