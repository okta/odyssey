---
summary: Button height is explicit per size, label weight lightens, full width unblocks
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c46798a50
---

Button metrics changed in four ways at once. Each size gained an explicit height where the height had been derived from padding plus line height: Spacing6 for small, Spacing7 for medium, Spacing8 for large. The label weight moved from TypographyWeightBodyBold to TypographyWeightHeading, which is 600 to 500, so labels read lighter. A full-width Button is no longer `display: block`, so it keeps the flex layout and its icons align differently. An icon-only large Button gained `padding: Spacing4`. Check any layout that reserved a fixed row height for a Button, and any place a Button is aligned against an adjacent input.
