---
summary: Dialog sets aria-labelledby, title text wrapped in a new span
affectedExports:
  - Dialog
  - Typography
files:
  - packages/odyssey-react-mui/src/Dialog.tsx
  - packages/odyssey-react-mui/src/Typography.tsx
commit: 34a8a55c5
---

Dialog now sets `aria-labelledby` on the MUI dialog and wraps the title text in a `<span id>` inside the title element, while pinning the title's own `id` so MUI stops deriving one. The dialog's accessible name is now computed from the span, and the title gained a DOM level. Check selectors that reached the title's direct text child, and snapshot tests over the dialog's id attributes.
