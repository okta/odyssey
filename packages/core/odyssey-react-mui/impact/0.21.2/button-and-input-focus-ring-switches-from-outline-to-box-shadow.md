---
summary: Button and input focus ring switches from outline to box-shadow
affectedExports:
  - Button
  - TextField
  - PasswordInput
  - InputBase
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: cebcca571
onlyRelevantIf: "any ancestor of a Button, IconButton or text input sets overflow: hidden, or app CSS styles the focus ring through outline"
---

The focus indicator on buttons and inputs moved from outline to a two-layer box-shadow, with a transparent outline left behind for forced-colors mode. A box-shadow is clipped by an ancestor's overflow and the transition list changed from outline-offset/outline-color to box-shadow. Check clipped containers and any CSS that overrode outlineColor.
