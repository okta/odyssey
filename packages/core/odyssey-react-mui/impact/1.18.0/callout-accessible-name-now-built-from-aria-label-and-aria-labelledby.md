---
summary: Callout accessible name now built from aria-label and aria-labelledby
affectedExports:
  - Callout
files:
  - packages/odyssey-react-mui/src/Callout.tsx
commit: 40a67d381
onlyRelevantIf: a Callout is rendered
---

Callout's accessible name changed shape. The visually hidden severity text was removed from the DOM, and the Alert now carries `aria-label` set to the severity plus `aria-labelledby` pointing at the title, which wins over the label. The title element itself gained `aria-hidden` and an id. Screen reader output changes, and a test asserting on the hidden severity string no longer finds it.
