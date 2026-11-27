---
summary: Status dot renamed `lamp`; neutral dot becomes outlined
affectedExports:
  - Status
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Status, whose default variant this is
---

The status dot was redrawn. The variant was renamed `status` to `lamp`, the dot grew from .57em to .64em square, and the neutral dot went from a filled #6e6e6e disc to a transparent disc with a 1.5px #272727 ring, so the default status now reads as an outline rather than a solid. The severity dots stay filled but change colour: error #d92300 to #e72500, success #197f48 to #16884a, and warning #986603 to #f9c503, which swaps a dark ochre for a bright yellow and is the one to check against a light background. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:561-594; v1.0.0 components.tsx:647-687.
