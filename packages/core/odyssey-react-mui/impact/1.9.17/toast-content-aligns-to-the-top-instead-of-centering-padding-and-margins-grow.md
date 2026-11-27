---
summary: Toast content aligns to the top instead of centering; padding and margins grow
affectedExports:
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 850f0ff82
---

The toast variant replaced alignItems: "center" with alignItems: "flex-start" plus paddingInlineStart Spacing5, paddingInlineEnd Spacing4, and paddingBlock Spacing3. Its icon, message, and close button gained their own block margins. A toast's contents now align to the top instead of centring, and the box is larger. Check single-line toasts and toast stack height.
