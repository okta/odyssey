---
summary: Long Drawer and Dialog titles wrap instead of overflowing
affectedExports:
  - Drawer
  - Dialog
files:
  - packages/core/odyssey-react-mui/src/Drawer.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Dialog.tsx
commit: b74d1b2b3
---

Drawer and Dialog titles gained `overflow-wrap: anywhere`, so a title with no break points, such as a key name, a URL, or an email address, now breaks mid-word instead of overflowing the header. The header can grow taller. Check headers with long unbroken titles, and visual baselines that capture them.
