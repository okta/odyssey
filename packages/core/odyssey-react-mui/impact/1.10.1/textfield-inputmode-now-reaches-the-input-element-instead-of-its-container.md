---
summary: TextField `inputMode` now reaches the input element instead of its container
affectedExports:
  - TextField
files:
  - packages/odyssey-react-mui/src/TextField.tsx
commit: 7a7d4af60
onlyRelevantIf: TextField was given the inputMode prop that 1.10.0 introduced
---

1.10.0 passed inputMode to MUI's input wrapper, where it landed on the container rather than the input element, so it had no effect on the keyboard. 1.10.1 moves it into inputProps as the lowercase inputmode attribute and it now reaches the input. A field that was silently ignoring the hint starts honouring it, changing the on-screen keyboard on touch devices.
