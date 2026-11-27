---
summary: Fieldset description renders via `Support` instead of `Subordinate`, darker
affectedExports:
  - Fieldset
files:
  - packages/odyssey-react-mui/src/Fieldset.tsx
commit: 6b167d742
---

Fieldset's description switched from <Subordinate component="p"> to <Support>, which is a different typography variant (support rather than subordinate: body size and the support colour instead of subordinate size and colour) and renders a different element. The description text gets larger and darker.
