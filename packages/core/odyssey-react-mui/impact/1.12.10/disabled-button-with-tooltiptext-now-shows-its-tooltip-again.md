---
summary: Disabled Button with `tooltipText` now shows its tooltip again
affectedExports:
  - Button
files:
  - packages/odyssey-react-mui/src/Button.tsx
commit: a6042e119
onlyRelevantIf: a Button is both disabled and given `tooltipText`
---

A disabled Button used to skip the Tooltip wrapper entirely, so its tooltip never appeared. It is now wrapped like an enabled one, so the tooltip shows and the button gains the `aria-describedby` wiring the Tooltip adds. Check tooltips that were written for the enabled state only, and tests that asserted no tooltip while disabled.
