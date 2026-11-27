---
summary: "Input element loses `box-sizing: border-box`, gaining a fixed, clipped height"
affectedExports:
  - Autocomplete
  - NativeSelect
  - PasswordField
  - SearchField
  - Select
  - TextField
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d59886ed3
---

MuiInputBase's inner input lost `box-sizing: border-box` and gained a fixed `height: calc(Spacing4 - 2 * BorderWidthMain)`, so text and adornments can be clipped in every field. The code comment above the line says the total is 40px, and it is not: the token is Spacing4, which is 1.14285714rem and resolves to about 16px, leaving roughly 14px after the borders. Spacing7 is the 40px token, and it is what 1.15.3 substitutes. A field that looks 26px too short while the source claims 40px is Odyssey's discrepancy, not a misconfiguration at your end. Field height is unstable across this whole run: it is set here, reverted at 1.15.2, set to a different value at 1.15.3, and settled at 1.15.4. An upgrade that crosses all four nets out to almost no change, so read this entry as load-bearing only if you are landing below 1.15.4.
