---
summary: MenuButton now passes testId as data-se to its trigger button
affectedExports:
  - MenuButton
files:
  - packages/odyssey-react-mui/src/MenuButton.tsx
commit: f53e9b317
onlyRelevantIf: a MenuButton is given testId
---

MenuButton passed `data-se` to Odyssey's Button component as an unrecognised prop, so the attribute never reached the DOM. It now passes `testId`, which Button applies. A `data-se` attribute appears on the trigger button where there was none, which is a behavior change for a Selenium suite that was matching something else as a workaround.
