---
summary: FileUploader `onChange` fires only on add and remove, not on mount or re-render
affectedExports:
  - FileUploader
files:
  - packages/core/odyssey-react-mui/src/FileUploader/FileUploader.tsx
commit: be7fd60d8
onlyRelevantIf: the consumer's `onChange` handler relied on being called once on mount with an empty list, or on every re-render
---

The effect that fired `onChange` on every state change was replaced by explicit calls on add and remove. It no longer fires on mount with an empty list and no longer fires on re-render. Check handlers that initialized state from that first call.
