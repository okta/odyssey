---
summary: Drawer body is now a CSS grid with header, content, and footer areas
affectedExports:
  - Drawer
files:
  - packages/core/odyssey-react-mui/src/Drawer.tsx
commit: e4664f78f
---

The Drawer body became a CSS grid with header, content, and footer areas. The scroll container moved from the outer wrapper onto the content element, and the footer is now a child of the wrapper rather than its sibling. The conditional `tabindex="0"` that marks a scrollable region moved with the scroll container. Check drawer scrolling, footer position, and any CSS or test locator written against the old wrapper and sibling structure.
