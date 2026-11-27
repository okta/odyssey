---
summary: Side nav accordion header lost its typography wrapper and weight
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/NavAccordion.tsx
commit: 3fe24091c
---

The accordion header lost its `Support` typography wrapper, one `div` in the process, and with it a block-end margin, the support text color, numeric font feature settings, and a letter-spacing reset. The wrapper also supplied the body font size, line height, font family, and font variant, none of which the replacement container sets, so the header label now inherits its size and line height from the accordion summary. The label's font weight dropped from the heading weight to the body weight, and the summary gained `alignItems: center`. Check accordion header spacing, weight, size, and color against a baseline, and check CSS that targeted the removed wrapper.
