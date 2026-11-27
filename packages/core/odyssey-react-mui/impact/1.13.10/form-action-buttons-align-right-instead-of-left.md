---
summary: Form action buttons align right instead of left
affectedExports:
  - Form
files:
  - packages/odyssey-react-mui/src/Form.tsx
commit: 28ba49bd7
onlyRelevantIf: a Form renders its own action buttons
---

The Form's action row moved from `justify-content: flex-start` to `flex-end`, so submit and cancel buttons now sit at the right edge of the form instead of the left. Nothing in the consumer's markup changed. Check screenshots, and check forms narrower than their container, where the buttons travel a long way.
