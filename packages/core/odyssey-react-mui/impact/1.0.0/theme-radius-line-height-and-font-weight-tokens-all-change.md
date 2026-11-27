---
summary: Theme radius, line-height, and font-weight tokens all change
affectedExports:
  - createOdysseyMuiTheme
  - OdysseyThemeProvider
  - OdysseyProvider
  - Typography
  - Heading1
  - Heading2
  - Heading3
  - Heading4
  - Heading5
  - Heading6
  - Paragraph
  - Subordinate
  - Support
  - Legend
  - Button
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
  - Dialog
  - Tabs
  - Tag
  - TagList
  - Toast
  - Tooltip
  - Callout
  - Banner
  - Status
  - Link
  - MenuButton
  - MenuItem
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/theme/typography.ts
  - packages/odyssey-react-mui/src/theme/palette.ts
  - packages/odyssey-react-mui/src/theme/mixins.ts
commit: 8f19d3045
---

theme/components.tsx was rewritten on the new token set, and several theme values changed with it rather than being carried across: the borderRadius mixin went from 4px to 6px, the maxWidth mixin from 32rem to 55ch, heading fontWeight from 600 to 500, headings now request the Aeonik family ahead of Inter, and theme.typography.fontWeightBold went from 600 to 700. Every line height changed (body 1.42857143 to 1.5, ui 1.14285714 to 1.2, heading2 1.28571429 to 1.2, and so on). The legend variant's font size moved up one scale step. subtitle2 and overline went from undefined to fully defined variants, so Typography variant="subtitle2" now carries styles and a block-end margin where it previously carried none. Palette greys 300, 400, 700 and 800 moved off hardcoded hex values onto HueNeutral tokens and changed value. Treat any pinned screenshot or measured dimension as stale.
