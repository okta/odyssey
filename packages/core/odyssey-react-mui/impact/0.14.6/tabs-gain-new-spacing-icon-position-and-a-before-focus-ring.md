---
summary: Tabs gain new spacing, icon position, and a `::before` focus ring
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.ts
commit: f5f32cc42
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiTab and MuiTabs gained theme overrides: tabs get a start icon position by default, 1.14285714rem block padding, no minimum width or height, a bottom-bordered flex container with a 1.71428571rem gap, and a 1.71428571rem bottom margin on the tab list. A focused tab draws its ring as a ::before pseudo-element. Check tab strips you spaced yourself and any ::before you already attached to a tab.
