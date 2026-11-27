---
summary: Input padding moves to `<input>`; adornment margins flip sides
affectedExports:
  - odysseyTheme
  - InputBase
  - InputAdornment
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: "250574053"
---

InputBase's padding moved off the wrapper and onto the inner <input>, and InputAdornment's margins flipped: position="start" now takes margin-inline-start and position="end" margin-inline-end, with the gap between adornment and text supplied by a new padding rule on the input. The text's starting position inside a field with adornments changes, and so does where the field's own background and border sit relative to the text. Check every field with a leading or trailing adornment.
