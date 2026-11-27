---
summary: "`code` and `pre` monospace font switches to Roboto Mono"
affectedExports:
  - ScopedCssBaseline
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
onlyRelevantIf: content inside ScopedCssBaseline that uses `<code>` or `<pre>`
---

The monospace family changed. Both `code` and `pre` went from the hardcoded `'Inconsolata', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', monospace` to `TypographyFamilyMono`, which is `'Roboto Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`. Roboto Mono is wider per character than Inconsolata, so fixed-width code blocks wrap differently. Note `kbd` was left on the old Inconsolata literal, so it no longer matches `code` and `pre`. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:695-696, 867-868; v1.0.0 components.tsx:836, 1018, and the unchanged kbd at 974-975.
