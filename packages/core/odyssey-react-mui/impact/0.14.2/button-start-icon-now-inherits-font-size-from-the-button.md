---
summary: Button start icon now inherits font size from the button
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: 555caddb45
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider and render MUI's Button, since Odyssey re-exports no MUI component at this version
---

A Button's start icon now inherits the button's font size, through a root-slot rule on `.MuiButton-startIcon > *:nth-of-type(1)`. MUI otherwise fixes that icon at 18px, 20px or 22px from the `size` prop, and the new rule carries one more class than MUI's, so it takes precedence. Under Odyssey's own `size: "s"` or `size: "l"`, MUI's `commonIconStyles` matches neither, so MUI emits no icon size at all and the inherited size is the only rule. A new variant matched on `children` equal to the empty string sets the button's minimum width to `auto` and zeroes the start icon's margin. MUI matches a variant by strict equality on each named prop, so that variant reaches a Button given `children=""` and not a Button with no children at all. Check icon sizing inside buttons, and the width and icon spacing of a button whose only content is an icon.
