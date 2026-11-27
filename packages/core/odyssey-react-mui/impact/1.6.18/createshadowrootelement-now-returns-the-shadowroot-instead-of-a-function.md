---
summary: "`createShadowRootElement` now returns the `ShadowRoot` instead of a function"
affectedExports:
  - createShadowRootElement
files:
  - packages/odyssey-react-mui/src/createShadowRootElement.ts
commit: f272015d4
onlyRelevantIf: "`createShadowRootElement` is called"
---

The return value changed from the function itself, which 1.6.1 shipped by mistake, to the `ShadowRoot`. Code that had worked around the broken return now receives a real object, and the name still says element while the value is the shadow root, not the `<div>` inside it. 1.9.1 changes this return value again.
