---
summary: Menu item 55ch width cap is restored, long items wrap again
affectedExports:
  - MenuItem
  - MenuButton
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 70d1c5bca
onlyRelevantIf: a menu, MenuButton, or Select with long item text
---

The !ownerState.isFullWidth && { maxWidth: "100%" } spread that had been overriding MuiMenuItem's 55ch cap since 1.29.0 was deleted, so maxWidth: calc(55ch - Spacing4) takes effect again. Long menu items are capped and wrap where they had been rendering at full menu width.
