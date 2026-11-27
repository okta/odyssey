---
summary: Icons and labs components move to `./icons`, `./labs` subpaths
affectedExports:
  - Autocomplete
  - Button
  - TextField
files:
  - packages/odyssey-react-mui/package.json
commit: 8f19d3045
---

Icons moved to a ./icons subpath and tables and the date picker to ./labs, both added to the package's exports map. The previous release's exports map allowed only the package root and its README, so these two subpaths are newly reachable. Anything else under the package path stays unreachable, as it already was.
