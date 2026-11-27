---
summary: IconButton gains hover, focus, active, and disabled fills
affectedExports:
  - odysseyTheme
  - PasswordInput
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: d84b135d7
onlyRelevantIf: you render Odyssey's PasswordInput, or pass odysseyTheme to MUI's own ThemeProvider
---

MuiIconButton went from a padding-and-font-size override to full interactive styling: a transparent background and border radius at rest, a 10% dark wash on hover and focus, 20% on active, and a disabled state with a translucent grey background. Check icon buttons you had styled yourself, which now sit on top of these.
