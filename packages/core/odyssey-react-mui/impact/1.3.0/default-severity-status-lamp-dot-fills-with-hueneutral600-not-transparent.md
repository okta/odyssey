---
summary: Default severity Status lamp dot fills with `HueNeutral600`, not transparent
affectedExports:
  - Status
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: ea87ea9fb
---

The default Status lamp's dot changed from a transparent circle to a HueNeutral600 fill, keeping its heavy body-coloured border. Non-default severities keep their own colours, so only severity="default" changes.
