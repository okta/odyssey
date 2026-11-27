---
summary: OdysseyProvider auto-detects contrast mode from ancestor background color
affectedExports:
  - OdysseyProvider
  - Button
  - Tag
files:
  - packages/odyssey-react-mui/src/ContrastModeProvider.tsx
  - packages/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 02874dc04
---

OdysseyProvider now wraps its children in ContrastModeProvider, which renders an extra div and, in a layout effect, walks that div's ancestors reading getComputedStyle().backgroundColor. If the nearest non-transparent ancestor background equals HueNeutral50, #f4f4f4, the theme switches to lowContrast, which changes Button and Chip styling. Nothing in the consumer's code selects this: it is decided by their page CSS and DOM topology, so two apps on the same Odyssey version render differently. Check apps with a gray page background, and check the new div against layouts that assumed the provider added exactly one wrapper. See 1.25.0, where this is removed, and 1.26.0, where it returns with the two mode names' meanings swapped.
