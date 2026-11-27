---
summary: UserProfileMenuButton grows content-sized, UserProfile loses end padding
affectedExports:
  - UserProfileMenuButton
  - UserProfile
files:
  - packages/odyssey-react-mui/src/labs/UserProfileMenuButton.tsx
  - packages/odyssey-react-mui/src/labs/UserProfile.tsx
commit: 80f3e902d
onlyRelevantIf: a labs UserProfileMenuButton or UserProfile is rendered
---

UserProfileMenuButton gained a new outer `div`, `StyledUnsetButtonHeightContainer`, around its BaseMenuButton, carrying a descendant `button` rule of `height: unset`, `paddingBlock: Spacing2` (0.57142857rem) and `textAlign: unset`. The button stops taking the theme's fixed button height and becomes content sized with its own block padding, so the profile button's height and its vertical position in the top nav both change. The new div also sits between the nav slot and the button, so a `> button` child selector no longer matches. In UserProfile, `UserProfileContainer` lost `paddingInlineEnd: Spacing4` (1.14285714rem), so the profile block no longer reserves that space on its inline end, and `UserProfileInfoContainer`, a styled div with `display: flex`, `flexDirection: column` and `textAlign: left`, became a plain `<div>`. The user name and org name still stack, because Subordinate renders as a `<p>`, but their alignment now inherits instead of being pinned to `left`, which means a right-to-left layout aligns them right. Check header height, the gap on the inline end of the profile block, and alignment under RTL.
