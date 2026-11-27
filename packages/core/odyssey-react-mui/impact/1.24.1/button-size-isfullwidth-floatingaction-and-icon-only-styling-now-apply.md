---
summary: Button size, isFullWidth, floatingAction, and icon-only styling now apply
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 87e93fbd5
onlyRelevantIf: a Button or MenuButton with size="small" or size="large", with isFullWidth, with variant="floatingAction", or with no label
---

Button already accepted size, isFullWidth and variant="floatingAction" at 1.24.0 and forwarded them to MUI, but the theme had no rules for any of them, so they rendered identically to the medium primary defaults. This release adds them all at once: small becomes Spacing6 tall with tighter padding, large becomes Spacing8, fullWidth becomes width: 100% with a Spacing4 bottom margin between consecutive buttons, and floatingAction gets a transparent background with action-colored text. Separately, because label defaults to the empty string, the new ownerState.children === "" branch fires for every Button with no label: minWidth becomes auto, padding collapses to a single Spacing value, and the startIcon and endIcon margins go to zero. Icon-only buttons get visibly smaller and tighter. Check button rows, toolbars and any layout sized around the old uniform button metrics.
