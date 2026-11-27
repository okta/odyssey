---
summary: Temporary Drawer goes full width below 400px viewports, not a fixed width
affectedExports:
  - Drawer
files:
  - packages/core/odyssey-react-mui/src/theme/components/Drawer.tsx
commit: 5dedf14be
onlyRelevantIf: a temporary Drawer at a viewport at or below 400 pixels wide
---

At a compact viewport width a temporary Drawer goes full width instead of its fixed roughly 400 pixels. The persistent variant is unchanged. Check drawer layout at small viewport sizes.
