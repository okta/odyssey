---
summary: Unselected tab label darkens to match the body text color
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Tabs with an unselected tab, which is any tab strip with more than one tab
---

Unselected tab labels darkened from #6e6e6e to the inherited body colour #272727. `MuiTabs` gained `defaultProps: { textColor: "inherit" }`, overriding MUI's own default of `"primary"`. Under `"primary"`, MUI's Tab sets `color: palette.text.secondary`, which resolved to `ColorPaletteNeutral600` #6e6e6e, on the unselected state; under `"inherit"` it takes `color: inherit` with `opacity: 0.6`, and `MuiTab`'s existing `ownerState.textColor === "inherit"` branch then forces `opacity: 1`. Colour still separates the two states, because the `ownerState.selected` branch is spread after the inherit branch and sets `TypographyColorAction` #4c64e1. What changed is which label is the dark one: the selected label used to be #272727 against an unselected #6e6e6e, and now the unselected label is #272727 while the selected one is blue. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1953 has no defaultProps; v1.0.0 components.tsx:2128-2130.
