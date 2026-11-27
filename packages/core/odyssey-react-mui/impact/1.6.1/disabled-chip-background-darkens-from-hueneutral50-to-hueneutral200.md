---
summary: Disabled chip background darkens from `HueNeutral50` to `HueNeutral200`
affectedExports:
  - Tag
  - TagList
  - Select
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c78a1e194
onlyRelevantIf: a disabled Tag, or a Select or Autocomplete that shows chips inside a disabled input
---

A disabled chip's background moved from HueNeutral50 (#f4f4f4) to HueNeutral200 (#e1e1e1), so it is darker and now reads as a filled pill rather than near-white. A chip inside a disabled input also takes TypographyColorDisabled for its label, including `WebkitTextFillColor`. Check contrast where disabled chips sit on a grey surface.
