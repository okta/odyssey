---
summary: Accordion frame changes from rounded side borders to square top/bottom borders
affectedExports:
  - Accordion
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 30e962f6f
---

The Accordion frame changed from left and right borders with rounded outer corners to top and bottom borders with square corners, and the MUI pseudo-element divider between items was removed in favour of a real bottom border. Corner radius is now zero on every item, including the first and last. The summary's grey hover background no longer applies on plain `:focus`, only on `:hover` and `:focus-visible`. Check Accordions placed inside a rounded container, and anything that lined up with the old outer radius.
