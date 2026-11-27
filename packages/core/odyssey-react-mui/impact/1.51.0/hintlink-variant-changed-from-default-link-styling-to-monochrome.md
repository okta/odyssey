---
summary: "`HintLink` variant changed from default link styling to monochrome"
affectedExports:
  - HintLink
files:
  - packages/core/odyssey-react-mui/src/HintLink.tsx
commit: f3345e067
onlyRelevantIf: the consumer renders the exported `HintLink` somewhere other than a field's `HintLinkComponent` slot
---

The hint link's variant changed from the default link styling to monochrome, so it renders in the text color rather than the action color. Inside a field, `FieldHint` already forces those same declarations on its descendant anchor at higher specificity, so the rendered result there is unchanged. Check any `HintLink` rendered outside that slot.
