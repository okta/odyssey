---
summary: Side nav neighbor detection now tracks layout live, not just on collapse
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
  - packages/odyssey-react-mui/src/ui-shell/useElementAtContainerEdge.ts
  - packages/odyssey-react-mui/src/getLogicalBoundaries.tsx
commit: "818448169"
onlyRelevantIf: an app rendering the side nav, with the largest effect where something sits inline-start of it
---

Detection of content beside the side nav moved from a one-shot bounding-box read on collapse to a live observer, so the collapsed side nav's peek-out transform and width now track layout changes as they happen. The old check ran only on a collapse change, so an app whose layout shifted for any other reason was measured against a stale value. The new value also starts out reporting that neighbouring content is present, until the first measurement lands, so a collapsed side nav's first paint differs even when nothing sits beside it. Check whether the collapsed side nav still shows its handle where the app expects, in both collapsed and expanded states.
