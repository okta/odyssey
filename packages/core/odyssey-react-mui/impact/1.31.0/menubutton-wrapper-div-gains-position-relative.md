---
summary: MenuButton wrapper div gains position relative
affectedExports:
  - MenuButton
files:
  - packages/odyssey-react-mui/src/Buttons/BaseMenuButton.tsx
  - packages/odyssey-react-mui/src/Buttons/index.ts
commit: 80f3e902d
onlyRelevantIf: a MenuButton with an absolutely positioned element among its children
---

Every MenuButton's wrapper `div` gained `position: relative`. The wrapper itself is not new and the element is unchanged: the plain `<div>` became `StyledMenuButtonContainer`, which is `styled("div")`, so it is still block-level and still matches a `> div` selector, now with an Emotion-generated class on it. `position: relative` makes the wrapper the containing block for any absolutely positioned descendant, which is the change to look for. Check anything absolutely positioned inside a MenuButton's children.
