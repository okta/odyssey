---
summary: Menu items enter the tab order instead of only arrow-key navigation
affectedExports:
  - MenuItem
  - MenuButton
files:
  - packages/odyssey-react-mui/src/MenuItem.tsx
commit: 1856d0f36
onlyRelevantIf: a Menu or MenuButton is rendered
---

MenuItem now sets `tabIndex={0}`, so every item in a menu enters the tab order rather than being reached by arrow keys from the active item. The number of Tab presses needed to traverse a page containing an open menu changes, and so does the result of any keyboard-navigation test.
