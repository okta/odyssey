---
summary: SearchField loses its border in highContrast mode
affectedExports:
  - SearchField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 620fcf38a
---

MuiInputBase's [data-ods-type='search'] block gained border: none when contrastMode is highContrast. Because contrast mode is detected from the ancestor background rather than set by the consumer, whether a SearchField keeps its border now depends on the page's CSS. Check search inputs on gray backgrounds, where the field's edge is no longer drawn.
