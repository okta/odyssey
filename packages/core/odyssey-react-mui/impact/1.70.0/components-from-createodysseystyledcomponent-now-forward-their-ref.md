---
summary: Components from createOdysseyStyledComponent now forward their ref
affectedExports:
  - createOdysseyStyledComponent
files:
  - packages/core/odyssey-react-mui/src/createOdysseyStyledComponent.tsx
commit: a77505cd1
onlyRelevantIf: the app calls createOdysseyStyledComponent and passes a ref to the component it returns, or uses that component as the child of a Tooltip
---

A component returned by createOdysseyStyledComponent now forwards its ref to the DOM node. Before, the ref was dropped, so it stayed `null`, and a MUI Tooltip or Popper with that component as its child did not open. Now the ref is set, and such a Tooltip opens on hover and focus. Check code that passes a ref to these components, and any Tooltip that wraps one, which now shows where before it did not.
