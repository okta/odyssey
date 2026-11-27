---
summary: Surface padding increases, loses shadow, gains a border in lowContrast
affectedExports:
  - Surface
files:
  - packages/odyssey-react-mui/src/Surface.tsx
commit: c6c83b87d
---

Surface's padding went from Spacing4 to Spacing5, it gained boxShadow: none where it previously inherited MuiPaper's elevation shadow, and it gained a conditional 1px HueNeutral100 border in lowContrast. Because lowContrast is the default and is also what a white ancestor background produces, most Surfaces now have a border and no shadow. All three together change the component's outer size and its visual weight.
