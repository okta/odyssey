---
summary: Autocomplete popup button title and accessible name use Odyssey translations
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/Autocomplete.tsx
commit: de55024a3
---

closeText and openText are now passed to MUI from Odyssey's translations instead of MUI's English defaults. MUI puts these on the popup indicator button's title attribute and accessible name, so that name changes in every locale, including English if the Odyssey string differs from "Open" and "Close". Check tests and automation that locate the indicator by title or accessible name.
