---
summary: "Chip labels now grow to fill their chip via `flex: 1`"
affectedExports:
  - Autocomplete
  - Select
  - Status
  - Tag
  - TagList
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 64728879e
---

The shared Chip label override gained `flex: 1`, so every chip label now grows to fill its chip. This reaches Status and Tag directly and reaches Select and Autocomplete through their selected-value chips. Check chips whose layout depended on the label sizing to its content, and check chips with a leading dot or icon next to a long label.
