---
summary: Tabs scroll buttons stay hidden until the browser tab regains visibility
affectedExports:
  - Tabs
files:
  - packages/odyssey-react-mui/src/Tabs.tsx
commit: 15d821841
onlyRelevantIf: a Tabs can overflow its container
---

Tabs now initialises `scrollButtons` to `false` and only sets it to `"auto"` from a `visibilitychange` listener. The comment says the listener is registered only when the document is hidden, but the code registers it whenever `scrollButtons !== "auto"`, and `visibilitychange` does not fire while the tab stays visible. A Tabs mounted in a visible document therefore keeps `scrollButtons: false` until the user leaves the browser tab and returns, so its overflow scroll buttons do not appear. Check tab strips that rely on scroll buttons in a narrow container.
