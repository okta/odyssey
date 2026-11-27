---
summary: Field labels no longer float; OutlinedInput notch is removed
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 2041953a2
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

MuiInputLabel, MuiOutlinedInput and MuiNativeSelect gained theme overrides. Labels no longer animate or shrink and are positioned statically rather than floating over the field, OutlinedInput's notch is disabled, its input padding is now calc(0.85714286rem - 1px) 0.85714286rem, and its outline colour changes on hover. Check any field where you positioned the label yourself or relied on MUI's floating-label geometry.
