---
summary: OdysseyThemeProvider adds a wrapper div around its children
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
  - Surface
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/odyssey-react-mui/src/Surface.tsx
commit: 9a6856956
---

OdysseyThemeProvider renders no DOM element at 1.25.0 and now wraps everything in a `div`, so one node appears between a consumer's mount element and the content. Consumers who mount OdysseyThemeProvider directly gain a wrapper element they have never had at any version. Three relationships break. A direct-child selector written against the mount point, such as `.host > .MuiScopedCssBaseline-root` or `.host > div:first-child`, now matches this div instead of the intended node. A `:nth-child` or `:first-child` count under the mount point shifts by one level. Where the mount element is a flex or grid container, this div becomes the flex or grid item, so `align-self`, `flex`, `grid-area` and any `> *` rule land on it rather than on ScopedCssBaseline's div, and because the new div is a plain block, the content inside it returns to normal flow. The div carries no styles in this commit, so it is also `height: auto` and stops a `height: 100%` or `height: inherit` chain, including the `height: inherit` OdysseyProvider sets on its own ScopedCssBaseline. Commit `16cd2b0ad`, also in 1.26.0, gives the div `height: inherit`, and `e34cbf510` names it StyledContrastContainer, so a consumer arriving at the release sees the styled form. Surface gains its own copy of this div, because it now wraps its children in a nested OdysseyThemeProvider.
