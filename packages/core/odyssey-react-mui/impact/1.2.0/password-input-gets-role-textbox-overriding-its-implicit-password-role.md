---
summary: Password input gets `role="textbox"`, overriding its implicit password role
affectedExports:
  - PasswordField
files:
  - packages/odyssey-react-mui/src/PasswordField.tsx
commit: 719848eba
---

PasswordField sets inputProps={{ role: "textbox" }} on its input, overriding the password input's implicit role. getByRole("textbox") now matches a password field where it did not before, and screen readers announce it as a text box.
