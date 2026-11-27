---
summary: "`ForwardRefWithType` removed from NativeSelect; `options` prop checking resumes"
affectedExports:
  - NativeSelect
  - ForwardRefWithType
files:
  - packages/odyssey-react-mui/src/NativeSelect.tsx
  - packages/odyssey-react-mui/src/@types/react-augment.d.ts
  - packages/odyssey-react-mui/src/index.ts
commit: 31c42ef1d
onlyRelevantIf: NativeSelect is used anywhere
---

The `ForwardRefWithType` annotation is removed from NativeSelect, so the props are inferred from the render function and `NativeSelectProps` governs the call site again, where 1.8.1 through 1.13.1 publish props of `any`. Ten releases of absent checking return at once, and two requirements fail on source that compiled throughout that window. `options`, required since 1.8.1 and read nowhere in any release, is now enforced, so a NativeSelect given only `label` and children reports that `options` is missing; the published props admit only `string` and `string[]` for it. The ref type, changed in 1.8.1 from `HTMLSelectElement` to `React.Ref<ReactElement>` and unchecked since, is now enforced, so a ref holding a `useRef<HTMLSelectElement>(null)` fails to assign. Unknown and misspelled props start failing, and the `@deprecated` marker on `isMultiSelect` reaches a call site for the first time. The same commit removes `ForwardRefWithType` from `react-augment.d.ts` and from the root barrel, so that exported type no longer exists, and removes the last import of `react-augment`, which ends the unresolved specifier the 1.8.1 packaging entry describes. `options` stays required until 1.63.0, where commit `531201072` makes it optional; it is read in no release.
