---
summary: Drawer close button falls back to a localized label when `ariaLabel` is omitted
affectedExports:
  - Drawer
files:
  - packages/core/odyssey-react-mui/src/Drawer.tsx
commit: c0896f293
onlyRelevantIf: a Drawer rendered without `ariaLabel`, which is the case that previously had no accessible name
---

The Drawer close button falls back to a localized close string when no `ariaLabel` is given, where it previously had no accessible name at all. Check accessibility snapshots, and check tests that located that button some other way because it had no name.
