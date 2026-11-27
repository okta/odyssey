---
summary: Password toggle button stays mounted after the password is revealed
affectedExports:
  - TextField
files:
  - packages/odyssey-react-mui/src/TextField.tsx
commit: 0645c5c14
onlyRelevantIf: a TextField rendered with type="password"
---

The password visibility toggle now keys off the type prop instead of the live input type, so the eye button stays mounted after the user reveals the password rather than disappearing. The end adornment is now present in both states.
