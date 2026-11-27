---
summary: Inputs no longer keep a stale value after switching control state
affectedExports:
  - TextField
  - SearchField
  - PasswordField
  - Select
  - NativeSelect
  - RadioGroup
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/inputUtils.ts
commit: 566cda8cc
onlyRelevantIf: an input you switch between controlled and uncontrolled at runtime
---

`useInputValues`'s memo gained `controlState` in its dependency array. It previously kept whichever of `value` / `defaultValue` it computed first, so a component that changed control state kept the stale shape. Inputs that flip control state now switch as intended. The commit's subject is about nested scroll containers.
