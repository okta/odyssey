---
summary: OdysseyThemeProvider's new wrapper div restores its height:inherit chain
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
  - Surface
files:
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
commit: 16cd2b0ad
---

The wrapper div `9a6856956` adds to OdysseyThemeProvider becomes a styled component carrying `height: inherit`. The interim state is a bare unstyled div at `height: auto`, which stops any height chain passing through the provider, including the `height: inherit` OdysseyProvider sets on its own ScopedCssBaseline. This commit restores that chain. It only matters where an ancestor sets an explicit height and the content below the provider is sized against it; where the parent is `height: auto`, `inherit` also resolves to `auto` and the div is transparent to layout either way. Both commits ship in 1.26.0, so the release nets out to one new wrapper div carrying `height: inherit`, and the collapsed interim is reachable only from a commit pinned between the two. Commit `e34cbf510`, also in 1.26.0, renames the component to StyledContrastContainer and rewrites it from a tagged template to an object with the same single declaration, so the computed style and the DOM shape are identical. Surface picks up the same restored div, because it wraps its children in a nested OdysseyThemeProvider.
