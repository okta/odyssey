---
summary: Status always renders as a pill; the `variant` prop and lamp styling are removed
affectedExports:
  - Status
files:
  - packages/odyssey-react-mui/src/Status.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: e4eb22169
onlyRelevantIf: a Status is rendered without an explicit variant, or with variant="lamp"
---

Status is now always the pill style. The variant prop and the lamp styling are gone, and the default used to be lamp, so a Status with no variant changes from a bare coloured dot beside plain body text to a bordered, padded, uppercase pill. It is wider, taller, and has a background. Check inline layouts and table cells holding a Status.
