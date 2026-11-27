---
summary: "`required` attribute no longer applied to SearchField, Select, NativeSelect"
affectedExports:
  - SearchField
  - Select
  - NativeSelect
  - InputBase
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 56db91337
---

MuiInputBase's defaultProps required: true was removed and replaced by per-component wiring from isOptional. TextField, PasswordField and Autocomplete set required themselves, but SearchField, Select and NativeSelect do not, so those three lose the HTML required attribute entirely. A form that depended on the browser blocking an empty submit now submits, and :invalid styling stops matching. Anything built on a directly rendered InputBase loses it too.
