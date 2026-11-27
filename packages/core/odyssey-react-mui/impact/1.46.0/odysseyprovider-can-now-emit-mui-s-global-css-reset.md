---
summary: "`OdysseyProvider` can now emit MUI's global CSS reset"
affectedExports:
  - CssBaseline
  - OdysseyProvider
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/UiShell.tsx
commit: c7f87461f
onlyRelevantIf: an app rendering the UI Shell, which opts into the new global baseline, or for an app that sets the new provider flag itself
---

OdysseyProvider gained a flag that emits MUI's document-wide CSS reset, and the UI Shell switched to it. The reset moved from inside the inner error boundary to one level up, so its position in the tree and its error-boundary coverage both changed. Check document-level typography and margin resets in UI Shell apps, and check styles on elements outside the Odyssey subtree, because a global reset reaches them.
