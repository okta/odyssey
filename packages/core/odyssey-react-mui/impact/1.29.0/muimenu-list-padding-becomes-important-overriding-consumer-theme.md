---
summary: MuiMenu list padding becomes important, overriding consumer theme
affectedExports:
  - MenuButton
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 79d4763ca
onlyRelevantIf: the MuiMenu list padding is overridden in the consumer's theme
---

MuiMenu's list paddingInline became Spacing2 !important. A consumer override at equal or lower specificity no longer wins. The value itself is unchanged.
