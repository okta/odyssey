---
summary: Card rewritten, now bordered with no shadow, padding moved inward
affectedExports:
  - Card
files:
  - packages/core/odyssey-react-mui/src/Card.tsx
  - packages/core/odyssey-react-mui/src/labs/DataView/DataCard.tsx
commit: 7a65ff5f0
---

Card was rewritten. Its content wrappers went from two levels to four, the inner Box is gone, and the card root is now a flex container. The theme's `MuiCard` root override still applies and the component now overrides it from outside: the card is bordered with no shadow where it was previously shadowed with no border, padding moved to an inner container, and hover now changes the border color as well as the shadow. The root no longer carries the `isClickable`, `hasAccessory`, or `ods-card-<variant>` classes that DataCard used to emit. Check card appearance, spacing, and any CSS or test locator written against the old structure or those classes.
