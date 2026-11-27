---
summary: Disabled floating button background becomes transparent
affectedExports:
  - Button
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ab11ee335
---

The floating Button's disabled background changed from rgba(235, 235, 237, 0.6) to transparent, so a disabled floating button now shows whatever is behind it. Check disabled floating buttons placed over a colored or patterned surface.
