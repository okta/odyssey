---
summary: Disabled SideNav items drop the `disabled` attribute, keep only `aria-disabled`
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNav.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemContent.tsx
commit: 78ed29e9c
onlyRelevantIf: a SideNav with a disabled item, selected by CSS or a test locator keyed on the `disabled` attribute
---

A disabled nav item no longer carries a `disabled` attribute. Three list items dropped it: the wrapper around an expandable item's nested list, the wrapper around that item's accordion, and the leaf item root. All three keep `aria-disabled="true"`, which is now the only disabled signal in the markup. `disabled` is not valid on a list item, and it did reach the rendered DOM, because the `shouldForwardProp` on those styled components excluded only the three style props and React emits `disabled` as a boolean attribute on any element, so a disabled nav item rendered as `<li disabled="" aria-disabled="true">`. A selector or locator shaped `li[disabled]`, or a bare `[disabled]` scoped inside the nav, matches a disabled nav item through 1.64.0 and matches nothing from 1.65.0. The `disabled` prop on the nav accordion is unrelated and unchanged; MUI consumes it and reflects it as a `Mui-disabled` class rather than an attribute. Check stylesheets and Selenium or Playwright locators that select a disabled nav item by that attribute rather than by `aria-disabled`.
