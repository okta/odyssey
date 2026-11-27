---
summary: Generated identifiers switch from React's hook to Odyssey's, changing format
affectedExports:
  - DataCard
  - DataView
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataCard.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: 043fb2e51
onlyRelevantIf: the consumer has snapshots or selectors keyed on the format of generated identifiers
---

Two call sites swapped React's identifier hook for Odyssey's own, so the generated strings change format from React's bracketed style to Odyssey's. One of them feeds `aria-controls`, so that attribute's value changes while the relationship it expresses stays correct. Check snapshots and selectors that captured the old format.
