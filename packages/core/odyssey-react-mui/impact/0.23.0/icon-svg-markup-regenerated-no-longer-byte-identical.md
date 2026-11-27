---
summary: Icon SVG markup regenerated, no longer byte-identical
affectedExports:
  - Icon
  - AddIcon
  - SettingsIcon
  - AnchorIcon
  - EyeOffIcon
  - UserGroupIcon
files:
  - packages/odyssey-react-mui/src/iconDictionary/
commit: 891b30404
---

Every icon's path data was regenerated with a newer SVGR and SVGO, replacing long enumerated coordinate lists with compact path commands and reordering the fill, fillRule and d attributes. The drawn shape is intended to be equivalent, but the emitted markup is not byte-identical, so DOM snapshots over icons all change.
