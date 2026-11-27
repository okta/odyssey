---
summary: Dialog title font changes; close button shifts inward
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Dialog title
---

The dialog title gained `fontFamily: TypographyFamilyHeading`, so it renders in Aeonik rather than inheriting the body family, and a new `.MuiButton-root { marginInlineEnd: -Spacing3 }` rule pulls the close button 0.857rem outward into the title's inline padding. The close button therefore sits closer to the dialog edge than the title text does. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1030-1040; v1.0.0 components.tsx:1195-1211.
