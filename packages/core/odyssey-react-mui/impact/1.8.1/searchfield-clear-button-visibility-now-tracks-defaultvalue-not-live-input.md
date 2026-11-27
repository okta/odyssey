---
summary: SearchField clear button visibility now tracks `defaultValue`, not live input
affectedExports:
  - SearchField
files:
  - packages/odyssey-react-mui/src/SearchField.tsx
commit: 40dec732c
onlyRelevantIf: a SearchField that shows a clear button
---

The clear button's visibility condition changed from the live input value to the `defaultValue` prop. A controlled SearchField never shows the button, and an uncontrolled one with a non-empty `defaultValue` shows it even after the user empties the field. Check every search input for a clear affordance that is now missing or stuck.
