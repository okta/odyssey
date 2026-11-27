---
summary: Compact card spacing now comes from the component, not a theme class
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: 7a65ff5f0
---

The theme's compact-card override was removed, and nothing emits the class it targeted any more, because the emitter was DataCard's variant class template. Compact spacing now comes from the component instead. Check compact card margins and padding, and check any consumer CSS that extended or depended on that class, including a consumer applying it by hand to a raw MUI Card.
