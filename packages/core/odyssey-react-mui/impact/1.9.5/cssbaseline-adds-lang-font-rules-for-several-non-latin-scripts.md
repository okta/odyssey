---
summary: "`CssBaseline` adds `:lang()` font rules for several non-Latin scripts"
affectedExports:
  - CssBaseline
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 7d0abdf32
onlyRelevantIf: "`CssBaseline` is mounted and content is rendered in Greek, Japanese, Korean, Thai, or Chinese"
---

`MuiCssBaseline`'s global stylesheet gained `:lang()` rules that switch `font-family` to a Noto Sans face per script: Noto Sans for el, Noto Sans JP, KR, Thai, SC, and TC. Odyssey ships and loads none of those fonts, so where they are not already on the machine the text falls through to plain `sans-serif` instead of the Inter and Aeonik stack. The rules compile to `:not(code) :lang(el), :not(pre) :lang(el)` and so on, which reaches every element below `<body>` carrying a matching language, including the consumer's own markup, not only Odyssey's. One thing narrows the population: OdysseyProvider mounts `ScopedCssBaseline`, and these rules live in the `MuiCssBaseline` block, so they only load when the consumer mounts `CssBaseline` themselves. 1.9.5 is also the release that starts writing `lang` on `<html>`, which is what makes `:lang()` match in the first place.
