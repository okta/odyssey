---
summary: Every OdysseyProvider subscribes to `prefers-reduced-motion` through `matchMedia`
affectedExports:
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/src/AnimationContext.tsx
  - packages/core/odyssey-react-mui/src/OdysseyProvider.tsx
commit: 0aaebf2d0
---

OdysseyProvider now wraps its children in an animation provider that reads `(prefers-reduced-motion: reduce)`. When `window.matchMedia` exists, every OdysseyProvider calls it on mount and calls `addEventListener` on the result, where before only some components, such as Dialog, Drawer, and LineChart, did that when they rendered. A test environment that defines `window.matchMedia` with a stub whose result has no `addEventListener` now throws when any Odyssey provider renders. Check the `matchMedia` stub in your test setup.
