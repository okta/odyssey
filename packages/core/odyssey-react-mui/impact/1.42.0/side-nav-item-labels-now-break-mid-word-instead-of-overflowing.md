---
summary: Side nav item labels now break mid-word instead of overflowing
affectedExports:
  - SideNav
  - UiShell
  - renderUiShell
files:
  - packages/odyssey-react-mui/src/ui-shell/SideNav/SideNavItemLinkContent.tsx
commit: 6e3d56ae8
onlyRelevantIf: impact depends on the consumer's own nav item labels, specifically whether any label holds a token longer than the collapsed nav width
---

Side nav item labels gained `overflowWrap: anywhere`, so a long unbroken label now breaks mid-word instead of overflowing. Check nav items whose labels hold long identifiers, URLs, or email addresses, because their row height can change.
