---
summary: ScreenReaderText renders a `<div>` instead of an inline span
affectedExports:
  - ScreenReaderText
  - Banner
  - Infobox
  - CheckboxGroup
  - RadioGroup
  - TextField
files:
  - packages/odyssey-react-mui/src/Banner.tsx
  - packages/odyssey-react-mui/src/Infobox.tsx
  - packages/odyssey-react-mui/src/CheckboxGroup.tsx
  - packages/odyssey-react-mui/src/RadioGroup.tsx
  - packages/odyssey-react-mui/src/TextField.tsx
commit: 3fb9881e9
onlyRelevantIf: an error message, hint or severity prefix rendered inside a <p>, or layout that relies on those prefixes being inline
---

The visually hidden prefixes switched from an inline <span style> to the new ScreenReaderText component, which renders a MUI Box and therefore a <div>. Inside FormHelperText that puts a <div> inside a <p>, which browsers reparent, so the rendered tree does not match the React tree and SSR hydration can warn. ScreenReaderText becomes a <span> again at 1.0.0.
