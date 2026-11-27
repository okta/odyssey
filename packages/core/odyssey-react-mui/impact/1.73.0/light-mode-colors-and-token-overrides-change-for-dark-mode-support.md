---
summary: Light-mode colors and token overrides change for dark mode support
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
  - OdysseyCacheProvider
  - createOdysseyMuiTheme
  - Button
  - MenuButton
  - Checkbox
  - CheckboxGroup
  - Switch
  - Tabs
  - Tag
  - Dialog
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/FullScreenOverlay.tsx
  - packages/core/odyssey-react-mui/src/OdysseyCacheProvider.tsx
  - packages/core/odyssey-react-mui/src/OdysseyProvider.tsx
  - packages/core/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/core/odyssey-react-mui/src/OdysseyThemeProviderPropsContext.tsx
  - packages/core/odyssey-react-mui/src/Switch.tsx
  - packages/core/odyssey-react-mui/src/Tag.tsx
  - packages/core/odyssey-react-mui/src/getActionTintChannel.ts
  - packages/core/odyssey-react-mui/src/getColorSchemeDesignTokensOverride.ts
  - packages/core/odyssey-react-mui/src/getDropShadowFilter.ts
  - packages/core/odyssey-react-mui/src/index.ts
  - packages/core/odyssey-react-mui/src/resolveColorSchemeDesignTokens.ts
  - packages/core/odyssey-react-mui/src/theme/components/Button.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Checkbox.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Chip.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Dialog.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Paper.tsx
  - packages/core/odyssey-react-mui/src/theme/components/Tabs.tsx
  - packages/core/odyssey-react-mui/src/theme/components/types.ts
  - packages/core/odyssey-react-mui/src/theme/createOdysseyMuiTheme.ts
  - packages/core/odyssey-react-mui/src/theme/palette.ts
  - packages/core/odyssey-react-mui/src/ui-shell/SideNav/SideNavToggleButton.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/UiShell.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/UiShellLogo.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/renderUiShell.tsx
  - packages/core/odyssey-react-mui/src/useContrastMode.tsx
  - packages/core/odyssey-react-mui/src/useThemeCache.ts
commit: 0c120c0ca
---

The dark token set comes from `@okta/odyssey-design-tokens/dark`, so odyssey-react-mui now imports that subpath and needs a design-tokens release that has it.

An app that never sets `colorScheme` renders light, as before, with these differences:

- A flat override applies in light mode only. Its type now rejects an object that mixes token names with a `light` or `dark` key.
- The label of a primary or danger Button, the check mark of a Checkbox and a Switch, and the hovered side nav toggle now read `TypographyColorInverse` instead of `HueNeutralWhite`. Both are white, but a `designTokensOverride` of `HueNeutralWhite` no longer reaches them.
- The Tabs scroll fade was hard-coded white and now uses `PaletteNeutralSurface`, which follows a `designTokensOverride` of `HueNeutralWhite`.
- Every OdysseyProvider also subscribes to `(prefers-color-scheme: dark)` through `window.matchMedia`, so a `matchMedia` stub in a test environment needs an `addEventListener` on its result.
- Automatic contrast detection also treats the active tokens' `HueNeutral50` as the page color, so a `designTokensOverride` of `HueNeutral50` now selects high contrast on that background.

Check apps that override `HueNeutralWhite` or `HueNeutral50`, and test setups that stub `matchMedia`.
