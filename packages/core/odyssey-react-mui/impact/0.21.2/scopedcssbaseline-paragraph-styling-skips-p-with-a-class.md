---
summary: ScopedCssBaseline paragraph styling skips `<p>` with a class
affectedExports:
  - ScopedCssBaseline
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c03cd9bd9
onlyRelevantIf: content inside ScopedCssBaseline that uses <p> elements carrying a className
---

The baseline's paragraph rule narrowed from p to p:not([class]), so a <p> with any class attribute no longer receives the max-width or the block margins. This depends on the consumer's own markup, not on their Odyssey usage.
