---
summary: Controlled multi-select chips gain a delete affordance with a synthetic event
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: d59886ed3
onlyRelevantIf: a Select is both controlled and accepts multiple choices
---

Chips in a controlled multi-select gained a delete affordance, and the non-interactive copy gained a CloseCircleFilledIcon inside each chip label. Deleting calls the consumer's `onChange` with a hand-built synthetic event whose only populated field is `target.value`, so a handler reading `event.type`, `event.currentTarget`, or anything else off the event receives `undefined`.
