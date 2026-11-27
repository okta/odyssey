---
summary: Autocomplete clear and dropdown icons shift down, change color
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: an Autocomplete
---

The clear and dropdown indicators shifted down by a pixel and changed colour. The end adornment's block-start inset was `calc(theme.spacing(2) - theme.mixins.borderWidth)`, `calc(0.571rem - 1px)`; it is now a flat `Spacing2` 0.571rem, so the 1px border compensation is gone. Its colour went from `palette.action.active` `rgba(0, 0, 0, 0.54)` to `TypographyColorSubordinate` #6e6e6e, which is a solid grey instead of a 54 percent black over whatever is behind it. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:173-190; v1.0.0 components.tsx:247-266.
