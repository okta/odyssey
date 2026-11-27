---
summary: Contrast mode detection returns with highContrast and lowContrast swapped
affectedExports:
  - OdysseyProvider
  - OdysseyThemeProvider
  - Status
  - Tag
  - Button
files:
  - packages/odyssey-react-mui/src/useContrastMode.tsx
  - packages/odyssey-react-mui/src/OdysseyThemeProvider.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
  - packages/odyssey-react-mui/src/Tag.tsx
commit: 9a6856956
onlyRelevantIf: a Status, Tag or disabled Button renders where an ancestor's computed background resolves to HueNeutral50, or contrastMode was passed explicitly at 1.24.0 or 1.24.1
---

Contrast auto-detection returns, now inside OdysseyThemeProvider rather than OdysseyProvider, so it also reaches consumers who mount OdysseyThemeProvider directly. Two inversions land in the same commit and cancel each other on a white background. `useContrastMode` maps a HueNeutral50 ancestor background to `highContrast` and everything else to `lowContrast`, the reverse of 1.24.0, and `ContrastModeContext` defaults to `lowContrast` where it defaulted to `highContrast`. At the same time `components.tsx` and `Tag.tsx` swap the values sitting under each label, so `lowContrast` now carries what `highContrast` carried. A white-background app therefore renders the same colours before and after. What changes is a Status, Tag or disabled Button whose nearest non-transparent ancestor background resolves to HueNeutral50, `#f4f4f4`. A default Chip goes from HueNeutral50 `#f4f4f4` on TypographyColorSubordinate `#6e6e6e` to HueNeutral200 `#e1e1e1` on HueNeutral700 `#4b4b4b`. The error, info, success and warning variants move from the Palette Lighter and TypographyColor set, the hue 50 and 600 shades, to the darker Hue 100, Hue 200 and Hue 700 set. A disabled Button's background goes from HueNeutral100 to HueNeutral200, with TypographyColorDisabled `#aeaeae` unchanged. A consumer who passes `contrastMode` explicitly at 1.24.0 or 1.24.1 gets the other set of values under the label they name, because the label kept its name and lost its values. The prop does not exist at 1.25.0, so nothing flips for a consumer arriving from there.
