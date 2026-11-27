---
summary: Select check icon match changes to `includes`, allowing substring matches
affectedExports:
  - Select
files:
  - packages/odyssey-react-mui/src/Select.tsx
commit: c06bea5ea
onlyRelevantIf: a single-choice Select
---

The check icon beside the selected option is now matched with `includes` rather than strict equality. Two effects follow. An uncontrolled single Select shows the check after the user picks an option, where before it showed none, because the internal value had become an array. A controlled single Select, whose internal value stays a string, now also shows the check on any option whose value is a substring of the selected value, so a list holding both `admin` and `super-admin` can show two checks. Check option values that are prefixes or substrings of one another.
