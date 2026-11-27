---
summary: Density and layout switcher labels now come from translations
affectedExports:
  - DataTable
  - DataView
files:
  - packages/core/odyssey-react-mui/src/DataTable/DataTableSettings.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/LayoutSwitcher.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/TableSettings.tsx
commit: 2d3adbc11
onlyRelevantIf: impact depends on the consumer's locale, because at English the translated strings match the previously capitalized keys exactly
---

Table density labels and the layout switcher button label now come from translations instead of being built by capitalizing the layout or density key. At English the text is unchanged; at other locales these controls now render translated text where they previously rendered capitalized English keys. Check the width of these controls and any non-English visual baseline.
