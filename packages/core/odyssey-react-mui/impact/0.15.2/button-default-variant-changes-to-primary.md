---
summary: Button default variant changes to `primary`
affectedExports:
  - odysseyTheme
  - Button
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: 871d2ffcc
---

MuiButton now defaults its variant to "primary". A <Button> with no variant previously fell through to MUI's text variant, which Odyssey gives no styling, and now renders as a filled blue primary button. Check buttons you deliberately left unstyled, and secondary actions that are now visually primary. The commit's subject is about the Tooltip theme and does not mention this.
