---
summary: Tabs now defaults to selecting the first tab, not none
affectedExports:
  - Tabs
files:
  - packages/core/odyssey-react-mui/src/Tabs.tsx
commit: baff3b8d0
onlyRelevantIf: a Tabs given neither `initialValue` nor `value`, and whose tabs include none whose value is the string zero
---

Default tab selection now falls back to the first tab's value. Previously no tab was selected and no panel rendered in this case. Check pages that relied on nothing being selected initially.
