---
summary: Icons now default to inherited font size instead of 1.5rem
affectedExports:
  - odysseyTheme
  - Icon
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: 73507ee06
---

MuiSvgIcon now defaults fontSize and color to "inherit", where MUI defaults fontSize to "medium" (1.5rem). Every icon under this theme now takes its size from the surrounding font size instead of a fixed 1.5rem. This is the one change in the 0.14.x to 0.15.1 span that needs no MUI component of your own: every one of Odyssey's own exported icons wraps MUI's SvgIcon with no explicit fontSize, so it reaches the Icon wrapper, all 38 named icon exports such as CheckIcon and CloseIcon, and PasswordInput's show-and-hide toggle. Check icons in headings, which grow, and icons in captions and small buttons, which shrink.
