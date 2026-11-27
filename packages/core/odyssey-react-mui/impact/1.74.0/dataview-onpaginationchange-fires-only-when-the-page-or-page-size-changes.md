---
summary: DataView onPaginationChange fires only when the page or page size changes
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
onlyRelevantIf: an app passes onPaginationChange to DataView
commit: b4a97e378
---

`onPaginationChange` used to fire on any render that gave it a new callback identity, and when DataView rebuilt a pagination object with the same values. An inline `onPaginationChange` then received the pagination from the previous commit. An app that fed that value back into `currentPage` made the page switch back and forth without end.

It now fires only when `pageIndex` or `pageSize` changes. These calls no longer happen:

- the second call at mount with `currentPage={1}`
- a call after the app sets `currentPage` or `resultsPerPage` to the values DataView already shows
- a call when `search` or `filters` change while DataView is already on page 1 with the same page size
- a call when the app passes a new `onPaginationChange` function

Check code that counts `onPaginationChange` calls, or that treats a call as a sign that search or filters changed. A workaround that memoized `onPaginationChange` or moved a `currentPage` reset into an effect to stop the loop is no longer needed.
