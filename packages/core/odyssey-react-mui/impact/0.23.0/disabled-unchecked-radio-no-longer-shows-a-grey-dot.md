---
summary: Disabled unchecked radio no longer shows a grey dot
affectedExports:
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 2a837c909
onlyRelevantIf: a disabled Radio is rendered unchecked
---

The disabled radio's grey ::before dot moved from `&::before` to `&.Mui-checked::before`, so an unchecked disabled radio no longer paints a grey dot. It previously showed one regardless of checked state.
