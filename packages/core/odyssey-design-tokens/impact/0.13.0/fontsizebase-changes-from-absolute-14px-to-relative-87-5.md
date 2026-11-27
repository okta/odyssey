---
summary: "`FontSizeBase` changes from absolute `14px` to relative `87.5%`"
affectedExports:
  - FontSizeBase
files:
  - packages/odyssey-design-tokens/src/font.json
commit: f590db18e
---

FontSizeBase changed from the absolute "14px" to the relative "87.5%". At a browser default of 16px the computed size is the same 14px, so nothing moves on a default setup. It now scales with the user's browser font-size setting and with any inherited font size, so check pages where the element carrying it is not the document root, and check how your layout behaves when a reader raises their default font size.
