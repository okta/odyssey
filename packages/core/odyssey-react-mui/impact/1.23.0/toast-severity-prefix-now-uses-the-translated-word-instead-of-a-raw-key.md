---
summary: Toast severity prefix now uses the translated word instead of a raw key
affectedExports:
  - Toast
  - ToastStack
files:
  - packages/odyssey-react-mui/src/Toast.tsx
commit: 12fa0f692
---

The screen-reader prefix changed from t(`severity.${severity}:`), a lookup for a key that does not exist and therefore rendered the literal text "severity.error:", to t(`severity.${severity}`) followed by a literal colon. The announced text goes from a raw key string to the translated severity word. Check automation that matched the old literal, and expect different screen-reader output.
