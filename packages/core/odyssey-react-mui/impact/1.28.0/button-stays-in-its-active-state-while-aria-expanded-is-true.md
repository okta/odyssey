---
summary: Button stays in its active state while aria-expanded is true
affectedExports:
  - Button
  - MenuButton
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 0fbeb124c
onlyRelevantIf: a Button given an explicit ariaExpanded, or any MenuButton
---

Every variant's "&:active" selector became "&:active, &[aria-expanded='true']". A button marked aria-expanded now renders in the pressed state for as long as it stays expanded, not just while the pointer is down. This is intended for MenuButton, and it also catches any Button a consumer marks as a disclosure trigger.
