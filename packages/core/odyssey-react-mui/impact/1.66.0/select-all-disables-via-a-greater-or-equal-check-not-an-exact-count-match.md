---
summary: Select All disables via a greater-or-equal check, not an exact count match
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/BulkActionsMenu.tsx
commit: 9658290bb
onlyRelevantIf: impact depends on the consumer's data and on whether row selection is controlled, since a controlled selection holding off-page identifiers is what makes the counts diverge
---

The Select All button's disabled test changed from an exact count match to a greater-or-equal comparison against the selectable count, which affects every consumer: with a controlled selection carrying identifiers outside the current page, Select All is now disabled where it previously was not. Check the Select All state with a controlled selection spanning pages.
