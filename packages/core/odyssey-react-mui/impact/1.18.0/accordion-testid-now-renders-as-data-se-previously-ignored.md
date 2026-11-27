---
summary: Accordion testId now renders as data-se, previously ignored
affectedExports:
  - Accordion
files:
  - packages/odyssey-react-mui/src/Accordion.tsx
commit: 892f6704e
onlyRelevantIf: an Accordion is given testId
---

Accordion accepted `testId` in its props type but never applied it. It now renders `data-se` on the MuiAccordion root, so the attribute appears where there was none.
