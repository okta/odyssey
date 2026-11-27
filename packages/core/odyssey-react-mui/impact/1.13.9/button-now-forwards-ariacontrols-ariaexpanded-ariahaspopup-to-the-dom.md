---
summary: Button now forwards `ariaControls`, `ariaExpanded`, `ariaHasPopup` to the DOM
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/Button.tsx
commit: d5e6d68fd
onlyRelevantIf: a MenuButton, or a Button given `ariaControls`, `ariaExpanded`, or `ariaHasPopup`
---

Button now forwards `ariaControls`, `ariaExpanded`, and `ariaHasPopup` to the rendered element. Until this release it accepted the three props in its type but never destructured them, so nothing reached the DOM: a MenuButton trigger had no `aria-haspopup`, no `aria-expanded`, and no `aria-controls` at all. From here the trigger carries `aria-haspopup="true"` always, and `aria-expanded` and `aria-controls` while the menu is open. Check screen reader scripts that had learned the old silence, and any accessibility snapshot of a menu trigger.
