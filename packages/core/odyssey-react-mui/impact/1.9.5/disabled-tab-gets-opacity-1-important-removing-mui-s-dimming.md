---
summary: "Disabled Tab gets `opacity: 1 !important`, removing MUI's dimming"
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 7d0abdf32
onlyRelevantIf: a disabled Tab
---

A disabled Tab now carries `opacity: 1 !important`, so MUI's dimming no longer applies and the only cue left is TypographyColorDisabled on the text. A disabled tab reads as closer to an enabled one than it did.
