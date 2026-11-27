---
summary: Callout body wrapped in new div, link uses raw MUI Link not Odyssey Link
affectedExports:
  - Callout
files:
  - packages/odyssey-react-mui/src/Callout.tsx
commit: 9c3cd910f
onlyRelevantIf: a Callout is rendered
---

Callout's body is now wrapped in a new `<div>` whose `& > * + *` rule puts Spacing4 between adjacent children, so an extra DOM level appears and the gaps between title, text, and link change. The link moved from Odyssey's `Link` to a raw MUI Link inside a `Box`, so it loses whatever Odyssey's Link wrapper contributes, and the theme rule that gave it `display: inline-block` and a Spacing5 top margin was removed.
