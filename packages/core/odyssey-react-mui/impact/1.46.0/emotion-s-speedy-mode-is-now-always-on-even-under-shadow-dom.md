---
summary: Emotion's speedy mode is now always on, even under Shadow DOM
affectedExports:
  - OdysseyCacheProvider
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/src/OdysseyCacheProvider.tsx
commit: c7f87461f
onlyRelevantIf: the consumer renders Odyssey inside Shadow DOM, or reads emitted style rules as text, for example a test asserting on stylesheet contents or a tool that serializes Emotion's output
---

Emotion's `speedy` mode is now always on, where it was previously forced off under Shadow DOM. Speedy inserts rules through the CSSOM rather than as stylesheet text, so rules stop being readable as text nodes. Check anything that inspects, snapshots, or serializes the emitted CSS, and check styling inside Shadow DOM, since the workaround that forced speedy off has been removed.
