---
summary: Tabs notification badge max count drops from 999 to 100
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/Badge.tsx
commit: a71900808
onlyRelevantIf: a Tabs item sets notificationCount above 100 without setting notificationCountMax
---

The internal Badge's badgeContentMax default dropped from 999 to 100. Tabs is the only export that reaches Badge, through notificationCount and notificationCountMax, so a tab showing a count of 150 now renders "100+" where it used to render "150". The badge also becomes narrower for counts it previously spelled out.
