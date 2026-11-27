---
summary: TextField `inputMode` prop key changes from lowercase `inputmode` to `inputMode`
affectedExports:
  - TextField
files:
  - packages/odyssey-react-mui/src/TextField.tsx
commit: f01353f04
onlyRelevantIf: a TextField is given an `inputMode`
---

The value reached MUI's `inputProps` under the all-lowercase key `inputmode` and now reaches it as React's canonical `inputMode`. Check the on-screen keyboard a mobile browser offers for these fields, and any console output that named the old key.
