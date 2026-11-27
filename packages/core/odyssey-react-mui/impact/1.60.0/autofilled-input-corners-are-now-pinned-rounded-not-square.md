---
summary: Autofilled input corners are now pinned rounded, not square
affectedExports:
  - Autocomplete
  - PasswordField
  - SearchField
  - Select
  - TextField
files:
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: 11a2ac414
onlyRelevantIf: a Chromium or WebKit browser, and only on an input the browser has autofilled
---

Autofilled inputs now have their border radius pinned to the main token value across the autofill hover, focus, and active states. The rule sits on the shared input base, so it reaches every field built on it, not only text and password fields. Corners that rendered square in Chrome, Edge, and Safari now render rounded. Check the corners of autofilled fields, and any visual baseline captured with a field autofilled.
