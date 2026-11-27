---
summary: InputBase now defaults to `required`
affectedExports:
  - odysseyTheme
  - InputBase
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ba06723a0
---

MuiInputBase now defaults required to true. Every input under this theme that does not explicitly pass required={false} gets the required attribute, which makes it block native form submission when empty, match :invalid, and be announced as required. This is the highest-risk change in the 0.16.0 release. Check every form you submit natively and every field you intended to be optional.
