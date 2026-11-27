---
summary: Select dropdown icon changes; its menu gains a top margin
affectedExports:
  - odysseyTheme
  - Select
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: "250574053"
---

MuiSelect now uses ChevronDownIcon as its IconComponent, replacing MUI's ArrowDropDown, and gained its own select padding and an inset icon position. MuiPopover was added with a top margin on its paper, so a menu no longer sits flush against its trigger. Check selects and popovers you positioned yourself.
