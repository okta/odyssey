---
summary: Dialog goes full screen, square corners, below 400x500px viewports
affectedExports:
  - Dialog
files:
  - packages/core/odyssey-react-mui/src/Dialog.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Dialog.tsx
commit: 361c97ac3
onlyRelevantIf: a viewport at or below 400 pixels wide or 500 pixels tall, so impact depends entirely on the consumer's viewport
---

At a compact viewport every Dialog now renders full screen with square corners and scrolls the body rather than the paper. The paper's class set changes with it. Check dialogs at small viewport sizes, especially ones with a fixed-height or absolutely positioned child, and CSS keyed on the paper scroll class.
