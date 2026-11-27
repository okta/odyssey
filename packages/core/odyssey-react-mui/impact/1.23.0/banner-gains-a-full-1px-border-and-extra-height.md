---
summary: Banner gains a full 1px border and extra height
affectedExports:
  - Banner
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8d9c36a84
onlyRelevantIf: a Banner
---

border: 0 was dropped from the MuiAlert banner variant, so the base border: 1px solid added at 1.21.2 now applies to Banner on all four sides with the severity's border color. A banner that sat flush against its surroundings now has a full outline and is 2px taller. This is undone differently at 1.24.0, which gives the banner a bottom border only, so an upgrade that crosses both versions sees neither state.
