---
summary: "`NativeSelect` props type collapses to `any`, losing prop and ref checking"
affectedExports:
  - NativeSelect
files:
  - packages/odyssey-react-mui/src/NativeSelect.tsx
  - packages/odyssey-react-mui/src/@types/react-augment.d.ts
commit: 40dec732c
onlyRelevantIf: NativeSelect is used anywhere
---

NativeSelect's signature moves from `forwardRef<HTMLSelectElement, NativeSelectProps>` to a `ForwardRefWithType` annotation, a type this commit introduces in a file it also creates. That type extends `FC<WithForwardRefProps<Option>>`, and neither `WithForwardRefProps` nor `Option` is declared anywhere in the package, so both resolve to the error type and the exported component's props collapse to `any`. 1.8.0 published a fully structural props type, so this is a loss of checking rather than a new requirement. Nothing on NativeSelect is checked any more: a missing required `label`, a wrong value type such as `label={42}`, an unknown or misspelled prop such as `isMultiSelct`, and a `ref` of the wrong element type all compile here and all failed at 1.8.0. Editor completion and hover documentation for the props are gone for the same reason, since no prop name resolves. `NativeSelectProps` separately gains a required `options: Value` property that the component never reads: the choices still come from `children`, and `options` is destructured nowhere and forwarded nowhere. That requirement is unenforceable while the props are `any`, so no call site fails on it. `isMultiSelect` also loses its `false` default, so `multiple` receives `undefined` when neither prop is given, which MUI's Select resolves to `false` through its own default. Nothing renders differently. Checking returns in 1.13.2, where commit `31c42ef1d` removes the annotation.
