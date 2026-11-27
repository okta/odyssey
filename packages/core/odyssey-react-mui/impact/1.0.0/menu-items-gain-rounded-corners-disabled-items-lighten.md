---
summary: Menu items gain rounded corners; disabled items lighten
affectedExports:
  - MenuItem
  - MenuButton
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a MenuItem, especially a disabled one
---

Menu items gained rounded corners and disabled items lightened. `borderRadius: BorderRadiusTight` 4px is new, so the hover and selected fills are now rounded rather than square-edged. Disabled item text went from `palette.text.disabled` #6e6e6e to `TypographyColorDisabled` #aeaeae, which is a large contrast drop on a white menu. A new `& .MuiFormControlLabel-root { gap: "unset" }` rule also cancels the new FormControlLabel gap for a checkbox or radio placed inside a menu item. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1434-1477; v1.0.0 components.tsx:1596-1644.
