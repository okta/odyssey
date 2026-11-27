---
summary: Disabled or loading Button now always attaches a click listener
affectedExports:
  - Button
  - MenuButton
files:
  - packages/core/odyssey-react-mui/src/Buttons/BaseButton.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Button.tsx
commit: b3ab584fa
---

Two things changed for every button. A click listener is now always attached and calls `preventDefault` when the button is disabled or loading, where a disabled button previously had no listener. This stops Enter or Space on a disabled submit button from submitting the form, which 1.60.0 left possible, so a guard you added in your own submit handler for that case is no longer needed. And the theme's disabled color rules narrowed to exclude the busy state, so the selector specificity changed for disabled and loading buttons. Check click handling on disabled buttons and any test that asserted no handler was attached.
