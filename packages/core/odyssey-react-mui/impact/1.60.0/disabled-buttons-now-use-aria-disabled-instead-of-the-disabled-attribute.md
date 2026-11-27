---
summary: Disabled buttons now use `aria-disabled` instead of the `disabled` attribute
affectedExports:
  - Button
  - MenuButton
files:
  - packages/core/odyssey-react-mui/src/Buttons/BaseButton.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Button.tsx
commit: f1eb8ae6b
onlyRelevantIf: a Button or MenuButton is ever rendered disabled
---

A disabled button no longer sets the native `disabled` attribute and uses `aria-disabled` instead. This is intended: a disabled button stays in the tab order, so keyboard and screen reader users can find it and hear that it is unavailable. Every disabled rule in the theme moved from `:disabled` to `[aria-disabled='true']`, and the hover and active rules gained `:not([aria-disabled='true'])` guards. Consequences reach past styling: MUI no longer applies its disabled class, and keyboard activation of a disabled submit button can still submit the form, because the click handler is withheld but `pointer-events: none` does not block Enter or Space. 1.68.0 closes that gap. Tests break too: jest-dom's `toBeDisabled()` and `toBeEnabled()` read only the native attribute, so a disabled Odyssey button now fails `toBeDisabled()` and passes `toBeEnabled()`. Assert `toHaveAttribute('aria-disabled', 'true')` instead, and `.not.toHaveAttribute('aria-disabled', 'true')` for an enabled button. Native inputs, checkboxes and selects still use `disabled`, so change only assertions on Odyssey buttons. Check `getAttribute('disabled')` assertions too: a `.not.toBeInTheDocument()` on that value still passes but no longer checks anything, and a failing check inside `waitFor` shows as a timeout, not as an assertion error. Check tab order, keyboard submission from disabled submit buttons, disabled button appearance, and any of your own CSS or test selectors keyed on `:disabled`, `[disabled]`, or `.Mui-disabled`. That includes CSS-in-JS, such as a `&:disabled` rule in a styled component or an `sx` object that targets an Odyssey button.
