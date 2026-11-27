---
summary: Tab minimum height grows from `unset` to `Spacing9` (4rem)
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: aac2f9470
---

The MuiTab minHeight override went from "unset" to Spacing9 (4rem), so every tab is now at least 4rem tall regardless of its content. Check layouts sized around the previous tab-strip height.
