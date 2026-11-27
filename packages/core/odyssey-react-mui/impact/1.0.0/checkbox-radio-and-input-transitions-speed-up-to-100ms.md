---
summary: Checkbox, Radio, and input transitions speed up to 100ms
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
---

Control transitions got two and a half times faster. Checkbox, Radio, and InputBase all passed `theme.transitions.duration.short`, which is MUI's 250ms because neither theme overrides `transitions`; they now pass `TransitionDurationMain` 100ms. The Radio's `::before` dot and the Checkbox's icon colour transition moved the same way, and TableSortLabel's icon went from `duration.shorter` 200ms to 100ms. Any test or animation sequenced against the old duration will see the change land earlier. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:449-461, 1240-1245, 1543-1559, 1931-1933; v1.0.0 components.tsx:526-537, 1381-1386, 1711-1727, 2105-2107.
