---
summary: Button hover and active states change across non-primary variants
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 0fbeb124c
---

Hover and active states changed across every non-primary Button variant. Secondary, dangerSecondary, floating and floatingAction all moved their hover background from HueNeutral100 to HueNeutral200, and secondary and dangerSecondary additionally gained borderColor: HueNeutral400 on hover. The active state for floating and floatingAction went from a gray background to transparent with a HueBlue600 border and text. dangerSecondary's disabled state went from transparent with a PaletteDangerLight border to a PaletteDangerHighlight background with no border, and secondary's disabled state lost its contrast-mode branches and is now always HueNeutral200.
