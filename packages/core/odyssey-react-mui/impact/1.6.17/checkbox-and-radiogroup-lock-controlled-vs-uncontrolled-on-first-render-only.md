---
summary: Checkbox and RadioGroup lock controlled vs uncontrolled on first render only
affectedExports:
  - Checkbox
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/Checkbox.tsx
  - packages/odyssey-react-mui/src/RadioGroup.tsx
  - packages/odyssey-react-mui/src/Radio.tsx
  - packages/odyssey-react-mui/src/FormCheckedProps.ts
  - packages/odyssey-react-mui/src/useControlledState.ts
commit: 588ba2c04
onlyRelevantIf: a Checkbox or RadioGroup whose controlling value is absent on the first render, for example while data loads
---

Both components now decide controlled versus uncontrolled once, on the first render, from whether `isChecked` / `value` is defined, and hold the answer in a ref. A value that arrives on a later render is treated as uncontrolled for the component's whole life, so the field stops following the consumer's state. Check fields rendered before their data resolves.
