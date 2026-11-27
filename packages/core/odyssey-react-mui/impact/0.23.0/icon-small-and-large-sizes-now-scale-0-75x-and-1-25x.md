---
summary: Icon `small` and `large` sizes now scale 0.75x and 1.25x
affectedExports:
  - Icon
  - SvgIcon
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 2976308b7
onlyRelevantIf: an icon rendered with fontSize="small" or fontSize="large"
---

MuiSvgIcon's root override began honouring ownerState.fontSize: small renders at 0.75x and large at 1.25x of typography.ui.lineHeight rem, where before every size rendered at 1x. Icons previously marked small or large change size.
