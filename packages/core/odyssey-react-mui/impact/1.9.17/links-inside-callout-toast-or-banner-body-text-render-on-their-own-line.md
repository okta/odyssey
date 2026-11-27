---
summary: Links inside Callout, Toast, or Banner body text render on their own line
affectedExports:
  - Callout
  - Toast
  - ToastStack
  - Banner
  - Link
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 850f0ff82
onlyRelevantIf: a Link is rendered inside a Callout, Toast, or Banner, including one passed as children
---

A new rule on the Alert message slot gives any descendant with the MuiLink-root class display: inline-block and marginTop: Spacing5. It carries no variant guard, so it hits all three alert variants, and it reaches links the consumer supplies in children, not only the linkUrl one Odyssey renders. An inline link inside callout body text now sits on its own line pushed down by Spacing5.
