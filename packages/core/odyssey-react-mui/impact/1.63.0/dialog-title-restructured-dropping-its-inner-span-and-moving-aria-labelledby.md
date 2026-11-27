---
summary: Dialog title restructured, dropping its inner span and moving `aria-labelledby`
affectedExports:
  - Dialog
files:
  - packages/core/odyssey-react-mui/src/Dialog.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Dialog.tsx
commit: 7b03ca50c
---

The dialog title was restructured. A new wrapper div is now the flex row, the title element itself carries the label identifier that `aria-labelledby` points at, and the bare span that held the title text is gone. The flex and padding rules moved out of the theme override into the new wrapper. Check the dialog's accessible name, and check CSS or Selenium locators anchored on the title element containing a span, or on the title being the flex container.
