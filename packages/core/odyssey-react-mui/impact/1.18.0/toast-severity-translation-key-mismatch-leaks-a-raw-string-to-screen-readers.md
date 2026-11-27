---
summary: Toast severity translation key mismatch leaks a raw string to screen readers
affectedExports:
  - Toast
files:
  - packages/odyssey-react-mui/src/Toast.tsx
commit: c57c96408
onlyRelevantIf: a Toast is rendered
---

The Toast's screen-reader severity prefix is now produced by `t(`severity.${severity}:`)`, with the colon inside the key. The properties file defines `severity.error`, `severity.info`, `severity.success`, and `severity.warning` with no colon, so the lookup misses and i18next returns the key itself. A screen reader now announces the literal string `severity.success:` in place of `success:`.
