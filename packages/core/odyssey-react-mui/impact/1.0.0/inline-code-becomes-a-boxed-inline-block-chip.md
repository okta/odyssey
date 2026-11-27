---
summary: Inline `code` becomes a boxed, inline-block chip
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: long-form content inside ScopedCssBaseline that uses `<code>`
---

`code` went from a font-family-only rule to a fully boxed inline chip. It gained `display: inline-block`, a `minWidth` of `calc(0.857rem * 1.3)`, a 1px solid #e1e1e1 border, `borderRadius: BorderRadiusTight` 4px, a #f4f4f4 background, `padding: calc(Spacing1 / 2) Spacing1`, `fontSize: TypographySizeSubordinate` 0.857rem, and `lineHeight` 1.3. Inline code now interrupts the line it sits in and is smaller than the surrounding text. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:694-697; v1.0.0 components.tsx:835-847.
