---
summary: Removable tag's delete icon now carries `role="button"` and a name
affectedExports:
  - Tag
  - TagList
files:
  - packages/odyssey-react-mui/src/Tag.tsx
  - packages/odyssey-react-mui/src/properties/odyssey-react-mui.properties
commit: e9f9a3053
onlyRelevantIf: a Tag rendered with a remove handler, which is what produces the delete icon
---

A removable Tag's delete icon now carries `role="button"` and an accessible name taken from the `tag.remove` string. Check accessibility snapshots, and check any role-based or name-based test query that counted the buttons inside a Tag.
