---
summary: Toast action button hover colors assume `PaletteNeutralDark` is a 6-digit hex
affectedExports:
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 850f0ff82
onlyRelevantIf: a Toast has an action or a close button
---

Buttons in a toast's action slot gained hover, focus, and active background colours built by appending the alpha hex "11" and "22" to PaletteNeutralDark. The concatenation assumes that token is a six-digit hex string, so an overridden PaletteNeutralDark in any other notation yields an invalid colour and the rule is dropped.
