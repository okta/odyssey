---
summary: Drawer title drops its bottom margin, shifting 4px toward the close button
affectedExports:
  - Drawer
files:
  - packages/core/odyssey-react-mui/src/Drawer.tsx
commit: 4eee54731
onlyRelevantIf: a Drawer given a title
---

The drawer header zeroes the bottom margin on fifth-level headings, and the drawer's own title is one, so the title loses its `Spacing2` bottom margin of 0.57142857rem, 8 pixels at Odyssey's 14 pixel root. The header is a centred flex row whose tallest item is the close button at `Spacing6`, so the header keeps its height and the title moves down 4 pixels instead, from slightly above the close button's centre to level with it. A title that wraps to two lines is taller than the button, and there the header does lose the full 8 pixels. The rule is a descendant selector, but nothing consumer-supplied reaches it, because the header holds only the title heading and the close button. Check drawer header spacing and the title's alignment against the close button.
