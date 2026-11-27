---
summary: Form and Fieldset drop the MuiBox-root class, move to Emotion styled
affectedExports:
  - Form
  - Fieldset
files:
  - packages/odyssey-react-mui/src/Form.tsx
  - packages/odyssey-react-mui/src/Fieldset.tsx
commit: f53e9b317
---

Form and Fieldset moved from MUI `Box` with an `sx` prop to Emotion `styled`. The rendered elements lose the `MuiBox-root` class, so a consumer's CSS or test selector keyed on `.MuiBox-root` inside a form stops matching, and Form's inner title and actions wrappers become plain `<div>`s. Form's `maxWidth` also moved from `theme.mixins.maxWidth` to the TypographyLineLengthMax token directly. The two hold the same value by default, so only a consumer who overrides `mixins.maxWidth` through `themeOverride` sees a difference, and for them the override silently stops applying to Form.
