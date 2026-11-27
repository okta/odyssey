---
summary: Tile wrapper warns on mount, overflow menu label renamed to Card menu
affectedExports:
  - Tile
  - Card
files:
  - packages/odyssey-react-mui/src/Card.tsx
commit: 6d7e3f3c0
onlyRelevantIf: Tile is still imported by that name, and either the test setup fails on console output (a `console.warn` spy that throws, jest-fail-on-console, or a strict CI log gate) or a test queries the overflow menu by its accessible name
---

`Tile` survives as a thin wrapper around the renamed `Card`, and the wrapper calls `console.warn` from an effect on every mount. Nothing about the rendered DOM changes, so a consumer whose tests tolerate console output can dismiss this; one whose setup treats a warning as a failure sees every Tile test break. Separately, the overflow menu button's `ariaLabel` changed from "Tile menu" to "Card menu", so its accessible name changes and a query by the old name no longer matches.
