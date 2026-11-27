---
summary: Disabled button no longer fires hover or tooltip events
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: dab8734aa
---

The `&:disabled` rule that set `cursor: not-allowed` and `pointer-events: inherit` was deleted from MuiButton, so a disabled Button falls back to MUI's own `pointer-events: none`. Mouseenter and mouseleave no longer fire on a disabled button, so a tooltip attached to one stops appearing and hover handlers on or around it stop firing.
