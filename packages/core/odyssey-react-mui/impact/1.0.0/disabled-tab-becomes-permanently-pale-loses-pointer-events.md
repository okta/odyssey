---
summary: Disabled tab becomes permanently pale, loses pointer events
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Tabs with a disabled tab
---

The disabled tab's treatment was rewritten. The `&.Mui-disabled` block that set `cursor: "not-allowed"` and `pointerEvents: "unset"`, and greyed the label to #6e6e6e only on hover, was deleted. In its place an `ownerState.disabled` branch sets `color: TypographyColorDisabled` #aeaeae unconditionally. A disabled tab is now permanently pale rather than pale on hover, and it no longer shows a not-allowed cursor or receives pointer events. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1715-1721; v1.0.0 components.tsx:1866-1868.
