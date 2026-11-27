---
summary: Reattaching the web component's host element creates a fresh React root
affectedExports:
  - renderReactInWebComponent
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/web-component/renderReactInWebComponent.ts
commit: 814d8cbf6
onlyRelevantIf: you move, detach, or reattach the shell's web component element in the DOM
---

Mount and unmount are now serialized through a single root promise that is reset to null on disconnect, instead of each callback firing independently. Re-attaching the element now creates a fresh React root rather than rendering into an unmounted one. Check anything that relied on the old behaviour surviving a move.
