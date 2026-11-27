---
summary: Autocomplete hides already-selected options from the dropdown list
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/Autocomplete.tsx
commit: 50e2ec1a8
---

Autocomplete hardcodes filterSelectedOptions={true}, overriding the theme's own filterSelectedOptions: false default. Already-selected options disappear from the dropdown list instead of staying visible with a check, so the list shrinks as the user picks and re-picking an option to deselect it is no longer possible from the list.
