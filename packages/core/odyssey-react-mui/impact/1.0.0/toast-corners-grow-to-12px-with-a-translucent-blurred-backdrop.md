---
summary: Toast corners grow to 12px with a translucent, blurred backdrop
affectedExports:
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: a Toast
---

Toast corners tripled and the fill became translucent. `borderRadius` switched from `mixins.borderRadius` to `BorderRadiusOuter`, 4px to 12px, which is a different token from the 4px-to-6px default radius move. The background now has `PaletteAlphaSemi` (`BF`, 75 percent) appended to the hue, and the root gained `backdropFilter: blur(10px)`. Whatever sits behind a toast now shows through it. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:78-85; v1.0.0 components.tsx:146-152.
