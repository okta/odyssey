---
summary: Autocomplete now remounts when `hasMultipleChoices` is toggled
affectedExports:
  - Autocomplete
files:
  - packages/core/odyssey-react-mui/src/Autocomplete.tsx
commit: 9ecf4fe7a
onlyRelevantIf: the consumer toggles `hasMultipleChoices` on a mounted Autocomplete
---

Autocomplete is now keyed on its single or multiple mode, so flipping that prop unmounts and remounts the underlying component. Input text, open state, and highlight reset in the process. Check flows that switch the mode on a live field.
