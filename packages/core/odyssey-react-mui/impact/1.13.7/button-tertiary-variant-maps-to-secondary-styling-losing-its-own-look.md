---
summary: Button `tertiary` variant maps to `secondary` styling, losing its own look
affectedExports:
  - Button
  - buttonVariantValues
files:
  - packages/odyssey-react-mui/src/Button.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: c46798a50
onlyRelevantIf: a Button uses `variant="tertiary"`, or reads `buttonVariantValues`
---

The `tertiary` variant is still accepted by the prop type, so nothing breaks, and it is now mapped to `secondary` before it reaches the theme. Its own styling was deleted, so a tertiary Button changes from a neutral grey fill with grey text to the secondary look. The exported `buttonVariantValues` array no longer holds `"tertiary"`, so code that iterates it to build a picker or a test matrix loses that entry.
