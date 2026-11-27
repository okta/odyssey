---
summary: Radio no longer defaults isDisabled and isReadOnly to false
affectedExports:
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/Radio.tsx
commit: c6df499be
---

Radio's isDisabled = false and isReadOnly = false defaults were removed, so both are undefined when not passed. Radio forwards disabled={isDisabled} to both MuiRadio and FormControlLabel, and MUI falls back to the surrounding FormControl context when disabled is undefined. A Radio that previously overrode a disabled ancestor with an explicit false now inherits disabled from it. The aria-disabled attribute also disappears instead of rendering as "false".
