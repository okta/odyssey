---
summary: Page header aligns top, with new gap and max width for title and actions
affectedExports:
  - PageTemplate
files:
  - packages/odyssey-react-mui/src/labs/PageTemplate/PageTemplate.tsx
commit: 9f9728c45
---

The page header's layout changed in four ways at once: the header aligns its children to `flex-start` instead of `flex-end`, it gained a `Spacing4` gap, the primary content picked up `max-width: TypographyLineLengthMax`, and the secondary content's gap went from `Spacing2` to `Spacing4` plus `white-space: nowrap`. Long titles now wrap within a measured line length and the action cluster no longer wraps. Check headers whose two halves were balanced by the old bottom alignment.
