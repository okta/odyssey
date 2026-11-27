---
summary: Button icon or element children no longer crash the render
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: e8e6be5b6
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider and render MUI's Button, since Odyssey re-exports no MUI component at this version
---

The Button root style no longer spreads ownerState into its emotion style object. ownerState carries every prop the Button received, so before the change emotion walked those props while serialising the root rule. A prop holding a React element sent that walk into the element itself, where it met `$$typeof`, a Symbol, and threw `TypeError: Cannot convert a Symbol value to a string`, so a Button given `startIcon`, `endIcon`, or JSX children failed to render at all. A Button whose children are a plain string rendered, and its props became declarations in the root rule: booleans and `undefined` emitted nothing, names that are not CSS properties were dropped by the browser, and `color` was the one name able to carry a value CSS accepts, so `color="inherit"` applied to any Button whose variant set no colour of its own. Each distinct prop set also produced its own generated class name. Check Buttons carrying icons or element children, Buttons passed `color="inherit"`, and any selector keyed to a generated class name.
