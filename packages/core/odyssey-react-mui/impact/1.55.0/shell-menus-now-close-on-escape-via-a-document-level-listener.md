---
summary: Shell menus now close on Escape via a document-level listener
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: f1ecafa8b
onlyRelevantIf: an app rendering the UI Shell at a narrow viewport
---

A `keydown` listener is now registered on `document` for the whole time narrow shell content is mounted, and it closes the shell menus on Escape without checking whether a menu is open and without stopping propagation. An app with its own Escape handling for a modal, combobox, or drawer now also triggers shell menu closing. The hamburger and user-menu buttons also gained accessible names, which they previously lacked entirely. Check Escape behavior across the app, and check accessibility snapshots in narrow view.
