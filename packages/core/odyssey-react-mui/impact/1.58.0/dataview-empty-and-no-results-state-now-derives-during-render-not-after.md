---
summary: DataView empty and no-results state now derives during render, not after
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
commit: 100e6e642
onlyRelevantIf: a DataView, and impact depends on whether the consumer passes `isEmpty`, `isNoResults`, or `isLoading`
---

Empty and no-results state moved from React state updated by effects to values derived during render. The initial empty value is now computed rather than defaulting to true, placeholders swap in the same render pass instead of one render later, and `isLoading={false}` is now honored as a controlled value where it was previously treated as absent. Check which placeholder renders on first paint, and check loading state in views that pass `isLoading` explicitly.
