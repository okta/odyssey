---
summary: Select input gains aria-disabled, affecting disabled interaction tests
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: 461ca96a7
---

The select input now carries aria-disabled set from isDisabled || isReadOnly. It carried no aria-disabled at all before. Assistive technology output changes, and Playwright's actionability checks treat aria-disabled as non-interactive, so tests that clicked a disabled Select to assert nothing happened may now time out instead.
