---
summary: "`createShadowRootElement` returns an `[emotionRoot, shadowRootElement]` tuple"
affectedExports:
  - createShadowRootElement
files:
  - packages/odyssey-react-mui/src/createShadowRootElement.ts
commit: 872f24c65
onlyRelevantIf: "`createShadowRootElement` is called"
---

The return value changed again, from the `ShadowRoot` of 1.6.18 to a two-element tuple `[emotionRoot, shadowRootElement]`. The function also now creates a `<style id="style-root" nonce>` and gives the div `id="shadow-root"`, so the shadow tree has an extra element and both children carry ids. Check any code destructuring or indexing the result, and any selector inside the shadow root.
