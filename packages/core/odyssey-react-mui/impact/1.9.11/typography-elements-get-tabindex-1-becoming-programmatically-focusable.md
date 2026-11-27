---
summary: Typography elements get `tabIndex="-1"`, becoming programmatically focusable
affectedExports:
  - Typography
  - Heading1
  - Heading2
  - Heading3
  - Heading4
  - Heading5
  - Heading6
  - Legend
  - Paragraph
  - Subordinate
  - Support
  - Accordion
  - BreadcrumbList
  - Checkbox
  - Fieldset
  - Form
files:
  - packages/odyssey-react-mui/src/Typography.tsx
commit: 3cdbca5a5
---

Typography now renders tabIndex="-1" on every element, unconditionally, and the heading, paragraph, legend, subordinate, and support wrappers all go through it. The elements stay out of the tab order but become programmatically focusable and are counted as focusable by focus-trap and modal libraries, by axe-style audits, and by any querySelectorAll("[tabindex]") sweep. Check focus management inside dialogs and drawers, and any test that enumerates focusable elements.
