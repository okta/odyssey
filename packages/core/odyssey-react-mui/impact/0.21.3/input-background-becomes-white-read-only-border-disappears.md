---
summary: Input background becomes white; read-only border disappears
affectedExports:
  - TextField
  - PasswordInput
  - InputBase
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 24431de2f
---

MuiInputBase gained an explicit white background and colour/background/box-shadow transitions, and a read-only input's border became transparent. An input that previously showed the surface behind it now paints white. Check inputs placed on a non-white background.
