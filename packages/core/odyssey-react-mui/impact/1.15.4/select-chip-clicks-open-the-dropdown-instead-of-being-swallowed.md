---
summary: Select chip clicks open the dropdown instead of being swallowed
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: ace529ffa
---

The interactive chip container's `pointer-events` is now always `none`, where it was `auto` while interactive, with only the delete icon opting back in. Clicking a chip's body now falls through to the Select and opens the dropdown rather than being swallowed. The invisible spacer element that reserved a Spacing6 row also now renders only when nothing is selected, so the field's height with chips present changes.
