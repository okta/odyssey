---
summary: Icon always gets a `<title>`; ref no longer forwards
affectedExports:
  - Icon
files:
  - packages/odyssey-react-mui/src/Icon.tsx
commit: 2976308b7
---

Icon now always passes titleAccess, so every icon renders a <title> element and has an accessible name where previously it had none unless titleAccess was supplied. The render function also stopped taking the ref parameter while still being wrapped in forwardRef, so a ref passed to Icon no longer reaches the SVG and measuring or focusing it through a ref stops working. Icon no longer accepts the rest of SvgIcon's props either. The forwardRef wrapper itself is removed at 0.24.0 by 8e7d62715, which additionally makes React warn.
