---
summary: Alert severity backgrounds lighten, base rule gains a 1px border
affectedExports:
  - Callout
  - Banner
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 0eb84c3c0
---

Every MuiAlert severity moved one step lighter, from Hue*100 to Hue*50, for both the plain and toast backgrounds, and the base rule went from border: 0 to border: 1px solid with a per-severity borderColor. Warning uses HueYellow500 as its border. These components are 2px taller and wider than before unless the consumer's box-sizing absorbs it. The banner variant keeps border: 0 at this version; see 1.23.0 and 1.24.0, where that changes twice.
