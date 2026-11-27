---
summary: Standalone InputAdornment reverts to MUI's standard variant
affectedExports:
  - InputAdornment
  - TextField
  - SearchField
  - PasswordField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 48e0c24cb
onlyRelevantIf: an InputAdornment rendered directly by the consumer and passed into startAdornment or endAdornment
---

MuiInputAdornment lost its defaultProps variant: "outlined", so an adornment the consumer constructs falls back to MUI's standard variant. Odyssey's own fields build their adornments internally and are unaffected.
