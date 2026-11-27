---
summary: "`CheckboxGroup` no longer sets an `id` on its rendered `FormGroup`"
affectedExports:
  - CheckboxGroup
files:
  - packages/odyssey-react-mui/src/CheckboxGroup.tsx
commit: ea497c6c2
---

CheckboxGroup dropped its `id` prop and no longer sets an id on the rendered FormGroup. Field derives that id with `useUniqueId`, which returns a generated value when nothing is passed, so the FormGroup carried an id on every CheckboxGroup, including ones that passed no `id` of their own. Every CheckboxGroup loses it, so a CSS rule or test selector anchored to that id stops matching whether or not the id was supplied from outside. The Field's generated id is also no longer overridable from outside. Nothing else anchored to it breaks: CheckboxGroup renders through Field's `group` fieldType branch, which labels the group with a legend and sets no `htmlFor`, and the hint and error ids are derived separately and still render, so `aria-describedby` still resolves.
