---
summary: Checkbox and Radio redrawn with custom, em-sized controls
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 1edf48b8b
---

Checkbox and Radio replaced MUI's SVG icons with Odyssey-drawn controls: the checkbox's icon slot is empty until checked, the radio draws its dot with a ::before pseudo-element, and both size themselves in em from typography.ui.lineHeight. Because the box is em-relative it now scales with the surrounding font-size, and a ::before pseudo-element on the radio collides with app CSS that added one.
