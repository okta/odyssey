---
summary: Warning icon color changes from `PaletteWarningDark` to `HueYellow400`
affectedExports:
  - Callout
  - Toast
  - ToastStack
  - Banner
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 850f0ff82
onlyRelevantIf: a Callout, Toast, or Banner uses severity="warning"
---

The warning icon colour changed from PaletteWarningDark to HueYellow400. Check contrast against the warning background if that background was overridden.
