---
summary: CssBaseline box-sizing now propagates into content-box subtrees
affectedExports:
  - CssBaseline
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 64341fc62
onlyRelevantIf: "you render Odyssey's CssBaseline yourself and a subtree of yours sets box-sizing: content-box"
---

The `MuiCssBaseline` override gained `*, *::before, *::after { box-sizing: border-box }`, with no `&`, and it is appended after MUI's own baseline at equal specificity, so it wins. MUI already emitted `html { box-sizing: border-box }` together with `*, *::before, *::after { box-sizing: inherit }`, so in a document every element was border-box already and nothing moves. What changes is that `box-sizing` stops propagating through a subtree that opted out: an element declaring `box-sizing: content-box` keeps its own value, because an author selector outranks `*`, and its descendants, which used to inherit `content-box`, resolve to `border-box`. `ScopedCssBaseline` reads the separate `MuiScopedCssBaseline` key and carries no such rule, so an app that wraps itself in `OdysseyProvider` and never renders `CssBaseline` is untouched. Check any content-box subtree whose descendants relied on inheriting it.
