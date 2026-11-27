---
summary: Shell shadow tree switches from content-box to border-box, header shrinks
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 64341fc62
---

The `MuiCssBaseline` override gained `*, *::before, *::after { box-sizing: border-box }`, and the shell's baseline stylesheet is inserted inside the shadow root. A shadow tree has no `html` element, so MUI's own `html { box-sizing: border-box }` matched nothing there and its `*, *::before, *::after { box-sizing: inherit }` walked inheritance up to the host, where `:host { all: initial }` computes `content-box`. The whole shell shadow tree was content-box and is now border-box. The header band is where that shows: `TopNav` declares `minHeight` and `maxHeight` of `TOP_NAV_HEIGHT` plus `paddingBlock: Spacing2`, the side nav header declares `height: TOP_NAV_HEIGHT` plus `paddingBlock: Spacing4`, and the app switcher wrapper declares `height: TOP_NAV_HEIGHT` plus `padding: Spacing4`. Each used to stand at its declared height plus its own padding, at three different outer heights; each now resolves to `TOP_NAV_HEIGHT` exactly. The band gets shorter, the three pieces line up, and the inner room for logo and button content shrinks by the padding. The app content cell gains the height the band loses.
