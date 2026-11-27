---
summary: "Destructive and disabled MenuItem force nested Typography to `color: inherit`"
affectedExports:
  - MenuItem
  - MenuButton
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 898635ef3
onlyRelevantIf: a MenuItem's children include an Odyssey Typography component and the item is destructive or disabled
---

The destructive and disabled MenuItem rules now force nested Typography to `color: inherit`. Text that kept its own Typography colour inside a destructive or disabled item now takes the item's danger or disabled colour. Check contrast where that text sat on a coloured background.
