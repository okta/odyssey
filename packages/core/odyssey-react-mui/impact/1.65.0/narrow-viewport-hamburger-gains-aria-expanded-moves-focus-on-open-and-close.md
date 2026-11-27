---
summary: Narrow-viewport hamburger gains `aria-expanded`, moves focus on open and close
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: 45111ca3f
onlyRelevantIf: an app rendering the UI Shell at a narrow viewport
---

The hamburger button gained `aria-expanded` and `aria-controls`, the side container gained an identifier and `tabindex="-1"`, and focus now moves into the container on open and back to the toggle on close. Check focus behavior when opening and closing the narrow menu, and check whether app-level focus management now competes with it.
