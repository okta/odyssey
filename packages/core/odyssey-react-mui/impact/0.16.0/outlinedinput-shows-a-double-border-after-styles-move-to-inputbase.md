---
summary: OutlinedInput shows a double border after styles move to InputBase
affectedExports:
  - odysseyTheme
  - InputBase
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/index.ts
commit: ba06723a0
---

Every MuiOutlinedInput theme override was deleted and the field styling moved to MuiInputBase; Odyssey also stopped re-exporting OutlinedInput and started re-exporting InputBase. Because OutlinedInput is built on InputBase, an OutlinedInput now draws InputBase's new 1px grey border and radius on its root and MUI's own unthemed notchedOutline fieldset inside it, so the field shows two borders, and the notched: false default that suppressed the label notch is gone. This reaches you two ways: an OutlinedInput you import straight from MUI, which still compiles; and Odyssey's own PasswordInput, which renders an OutlinedInput internally at every version from 0.15.3 through 0.20.0, so you are affected with no MUI import of your own. Check every password field and every field that still routes through OutlinedInput.
