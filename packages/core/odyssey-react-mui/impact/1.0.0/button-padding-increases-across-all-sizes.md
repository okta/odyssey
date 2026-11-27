---
summary: Button padding increases across all sizes
affectedExports:
  - Button
  - MenuButton
  - Dialog
  - Toast
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
---

Every Button got wider and one pixel taller. Padding went from `calc(theme.spacing(3) - 1px) theme.spacing(3)`, `calc(0.857rem - 1px)` block and 0.857rem inline, to `paddingBlock: Spacing3` 0.857rem and `paddingInline: Spacing4` 1.143rem. That is the medium size; small went from `calc(0.571rem - 1px)` on both axes to `Spacing2` 0.571rem block and `Spacing3` 0.857rem inline, and large from `calc(1.143rem - 1px)` on both axes to a flat `Spacing4` 1.143rem. Icon-only buttons, matched on `children: ""`, also gained `padding: Spacing3` 0.857rem, or `Spacing2` 0.571rem at small, where they had no padding rule at all. Re-measure button rows, toolbars, and anything sized against a button. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:322-335, 351-359, 365; v1.0.0 components.tsx:314-315, 450-458, 469-480.
