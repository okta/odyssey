---
summary: Paper elevation 1 to 3 get new depth-token shadows, replacing MUI defaults
affectedExports:
  - Paper
  - MenuButton
  - Select
  - Autocomplete
  - Dialog
files:
  - packages/odyssey-design-tokens/src/depth.json
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 00f1cfb47
---

MuiPaper's elevation1, elevation2 and elevation3 classes now carry three new depth tokens, replacing MUI's own elevation shadows. Paper's default elevation is 1, so every Paper picks up the new shadow, and Autocomplete and Select menus were pinned to elevation 1 in the same commit. Check a Paper, Menu, Popover or Autocomplete dropdown whose shadow is part of the layout, and app CSS that overrode MUI's elevation classes.
