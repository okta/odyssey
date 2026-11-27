---
summary: Status pill loses its severity indicator dot
affectedExports:
  - Status
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: b4f9ded6f
onlyRelevantIf: a Status is rendered without an explicit variant, or with variant="pill"
---

The MuiChip pill variant lost its ::before indicator dot, along with the dot's marginInlineEnd of Spacing2. Status defaults variant to "pill", so a Status with no variant prop is affected. The label shifts toward the pill's leading edge and the severity is no longer carried by a colored dot, only by the background and text color. Check layouts that measured pill width, and check whether severity is still distinguishable in the consumer's own palette overrides.
