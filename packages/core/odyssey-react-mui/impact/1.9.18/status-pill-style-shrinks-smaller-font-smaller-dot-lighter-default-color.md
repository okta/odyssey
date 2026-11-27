---
summary: "Status pill style shrinks: smaller font, smaller dot, lighter default color"
affectedExports:
  - Status
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e4eb22169
onlyRelevantIf: a Status was explicitly set to variant="pill"
---

The pill style itself changed: textTransform: uppercase is new, the font size moved from the TypographySizeSubordinate token to a hardcoded 0.71428571rem, the leading dot shrank from .64em to 0.42857143rem, its inline margin went from Spacing1 to Spacing2, and its default colour lightened from HueNeutral600 to HueNeutral400. The dot switching from em to rem means it no longer tracks the pill's own font size.
