---
summary: Only the top backdrop paints when overlays stack
affectedExports:
  - Dialog
  - Drawer
files:
  - packages/core/odyssey-react-mui/src/Dialog.tsx
  - packages/core/odyssey-react-mui/src/Drawer.tsx
  - packages/core/odyssey-react-mui/src/backdropStack.ts
  - packages/core/odyssey-react-mui/src/theme/components/Backdrop.tsx
  - packages/core/odyssey-react-mui/src/useStackedBackdropProps.ts
commit: 849e87418
onlyRelevantIf: the app opens a Dialog over a temporary Drawer, or more than one Dialog at a time
---

When a Dialog opens over a temporary Drawer or another Dialog, both backdrops used to paint, so the page behind them was darkened twice. Now only the top open backdrop paints. The ones under it are rendered `invisible`, and a backdrop that opens or closes over another one skips its fade, so the gray changes in one step. The last backdrop to close still fades out. The order follows the overlay's z-index first and opening order second. An `invisible` backdrop also drops its `backdrop-filter`, so a covered `security` Dialog no longer blurs the page twice. The stack is shared within one copy of odyssey-react-mui, so overlays from two separately bundled copies still each paint their own backdrop. Check visual baselines with stacked overlays, and tests that read a backdrop's opacity, color, or transition.
