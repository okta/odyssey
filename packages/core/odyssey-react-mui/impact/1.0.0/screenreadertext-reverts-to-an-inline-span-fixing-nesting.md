---
summary: ScreenReaderText reverts to an inline `<span>`, fixing nesting
affectedExports:
  - ScreenReaderText
  - Banner
  - Callout
  - TextField
  - CheckboxGroup
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/ScreenReaderText.tsx
commit: 8f19d3045
onlyRelevantIf: an error message, hint or severity prefix rendered inside a <p>
---

ScreenReaderText now renders its Box with component="span", so the invalid <div>-inside-<p> nesting introduced at 0.21.4 is gone. Layouts that had compensated for the block-level element see the prefix become inline.
