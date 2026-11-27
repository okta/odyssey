---
summary: Chip delete icon hides and greys inside a disabled input
affectedExports:
  - Chip
  - Tag
  - TagList
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 14bec9104
onlyRelevantIf: a Chip or a Tag whose delete icon is restyled by app CSS, or chips rendered inside a disabled input
---

The delete-icon rules moved out of a descendant selector on the Chip root into MUI's deleteIcon slot, which changes the generated selector's specificity and the order it lands in the stylesheet. Two new rules also hide the delete icon and grey the chip when it sits inside a disabled MuiInputBase.
