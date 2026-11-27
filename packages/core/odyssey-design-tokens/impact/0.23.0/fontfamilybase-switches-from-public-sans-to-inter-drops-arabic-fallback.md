---
summary: "`FontFamilyBase` switches from Public Sans to Inter, drops Arabic fallback"
affectedExports:
  - FontFamilyBase
  - FontFamilyMono
files:
  - packages/odyssey-design-tokens/src/font.json
commit: f3cfad136
---

FontFamilyBase moved from 'Public Sans' to 'Inter' and dropped 'Noto Sans Arabic' from the end of the stack; FontFamilyMono dropped 'Inconsolata' from the front. An app that self-hosts Public Sans or Inconsolata but not Inter now renders in a system fallback, and Arabic text loses its named fallback and falls through to whatever the platform picks. Note that the Odyssey theme's own MuiTypography default kept 'Noto Sans Arabic' in the same release, so token-driven and Typography-driven text no longer share the same stack.
