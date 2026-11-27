---
summary: Status default Chip variant changes from `status` to `lamp`
affectedExports:
  - Status
files:
  - packages/odyssey-react-mui/src/Status.tsx
commit: 8f19d3045
---

Status gained a variant prop defaulting to "lamp" and passes it straight to Chip, where before it always passed variant="status". Every existing Status renders through a different Chip variant. severity="info" was also dropped from the accepted set.
