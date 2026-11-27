---
summary: Dialog footer gains top padding; its buttons can now wrap
affectedExports:
  - Dialog
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Dialog with footer buttons
---

The dialog footer gained 1.143rem of top padding and its buttons can now wrap. `paddingBlockStart` went from `theme.spacing(4)` 1.143rem to `Spacing6` 2.286rem, matching the block-end and inline padding, and the root gained `flexWrap: "wrap"` plus `gap: Spacing2` 0.571rem. One caveat worth knowing before you measure: the accompanying rule meant to zero the buttons' own margins is written as the plain string `"& > .${ buttonClasses.root }"` rather than a template literal, so it compiles to a selector containing a literal dollar-brace and cannot match any element. MUI's own 8px inter-button margin therefore survives and stacks on top of the new 0.571rem gap. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:985-989; v1.0.0 components.tsx:1148-1158.
