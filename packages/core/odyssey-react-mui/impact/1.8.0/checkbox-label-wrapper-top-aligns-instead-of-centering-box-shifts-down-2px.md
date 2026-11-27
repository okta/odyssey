---
summary: Checkbox label wrapper top-aligns instead of centering; box shifts down 2px
affectedExports:
  - Checkbox
files:
  - packages/odyssey-react-mui/src/Checkbox.tsx
commit: ba054a979
---

Every Checkbox, not only one with the new `hint`, now renders with `alignItems: "flex-start"` on its label wrapper and a 2px top margin on the box. The box and label are top aligned instead of centred, and the box sits 2px lower. Check single-line checkboxes in dense rows and anywhere a checkbox was aligned against neighbouring controls.
