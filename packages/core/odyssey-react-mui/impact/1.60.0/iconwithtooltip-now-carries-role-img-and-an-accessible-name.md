---
summary: IconWithTooltip now carries `role="img"` and an accessible name
affectedExports:
  - IconWithTooltip
files:
  - packages/core/odyssey-react-mui/src/IconWithTooltip.tsx
commit: baff3b8d0
---

The icon now carries `role="img"` and an accessible name taken from the tooltip text. Because the tooltip also describes the child with the same string, that text is now both the accessible name and the description, so assistive technology can announce it twice. Check accessibility snapshots.
