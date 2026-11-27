---
summary: UI Shell's overlay host div can now carry a fixed `id`
affectedExports:
  - OdysseyProvider
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/FullScreenOverlayContext.tsx
  - packages/core/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/UiShell.tsx
commit: f63963298
onlyRelevantIf: an app rendering the UI Shell, which sets a fixed value, or one passing its own `overlayParentElement`
---

The overlay host div can now carry an `id`, and the UI Shell sets a fixed one. Two shells on one page therefore produce a duplicate id. When the new prop is absent the code calls `removeAttribute("id")` on the element, which strips an id the consumer set themselves on an element they passed in. Check for a new id on the body-level overlay host, for duplicate ids, and for a lost id on a supplied overlay parent.
