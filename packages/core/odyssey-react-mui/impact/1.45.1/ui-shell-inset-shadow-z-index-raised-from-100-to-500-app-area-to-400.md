---
summary: UI Shell inset shadow z-index raised from 100 to 500, app area to 400
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/InnerAppContainer.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/uiShellSharedConstants.ts
  - packages/core/odyssey-react-mui/src/ui-shell/useMatchAppElementToUiShellAppArea.ts
commit: 8c180d5f3
onlyRelevantIf: an app rendering the UI Shell, which is what carries these layers
---

The UI Shell's inset shadow moved from z-index 100 to 500 and the app area moved from 1 to 400. An app whose own positioned content sat between those values changes stacking order. Commit `c773d8ecf` reverted this completely in 1.45.2 and the revert held, so an upgrade crossing both releases has no net change and only an upgrade landing exactly on 1.45.1 is affected.
