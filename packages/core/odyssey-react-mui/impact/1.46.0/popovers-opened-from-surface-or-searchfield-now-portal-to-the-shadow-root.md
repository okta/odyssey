---
summary: Popovers opened from `Surface` or `SearchField` now portal to the shadow root
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
  - SearchField
  - Surface
files:
  - packages/core/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/core/odyssey-react-mui/src/OdysseyThemeProviderPropsContext.tsx
commit: c7f87461f
onlyRelevantIf: impact depends on where the consumer nests providers. A nested OdysseyThemeProvider, which Surface and SearchField both render for contrast mode, previously produced a theme with no portal container
---

A new context provider sits between the MUI theme provider and the design tokens provider, and a nested OdysseyThemeProvider now inherits `shadowRootElement`, `designTokensOverride`, and `themeOverride` from it rather than losing them. The theme sets that element as the portal container for dialogs, modals, popovers, and poppers, so popovers opened from inside a Surface or SearchField now portal into the shadow root instead of to body. Check the position and styling of popovers, menus, and tooltips opened from within a Surface.
