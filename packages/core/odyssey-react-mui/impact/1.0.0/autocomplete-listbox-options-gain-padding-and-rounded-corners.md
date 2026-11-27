---
summary: Autocomplete listbox options gain padding and rounded corners
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: an Autocomplete whose open listbox overlays other content
---

Two slots gained styling that did not exist before. `listbox` now has `paddingBlock` and `paddingInline` of `Spacing2` 0.571rem and `borderRadius: BorderRadiusMain` 6px, where it previously took MUI's own 8px block padding and zero inline padding. `option` gained `paddingBlock: Spacing3` 0.857rem and `borderRadius: BorderRadiusTight` 4px. Option rows are taller and inset, so a listbox sized to a fixed height shows fewer of them. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. Neither slot appears at v0.24.0; v1.0.0 components.tsx:267-279.
