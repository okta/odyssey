---
summary: UI Shell posts a fullscreen state request to the top window on mount
affectedExports:
  - UiShell
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/message-bus/createBrowserMessageBus.ts
  - packages/core/odyssey-react-mui/src/message-bus/fullscreen/createFullscreenModeHost.ts
  - packages/core/odyssey-react-mui/src/ui-shell/UiShell.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/WideUiShellContent.tsx
  - packages/core/odyssey-react-mui/src/ui-shell/NarrowUiShellContent.tsx
commit: 9957c29b1
onlyRelevantIf: an app that renders the UI Shell, or renders FullscreenRegion, FullscreenButton, or useFullscreen
---

The UI Shell now hosts a page-wide fullscreen state. On mount it adds a `message` listener to the top window and calls `window.postMessage` to ask for the current state, and its top nav, side nav, and banners now hide while anything on the page is in fullscreen. In jsdom, `postMessage` delivers the message through a `setTimeout` of 0, so tests that use fake timers, count pending timers, or fail on work left after the test ends can see a new timer or a late `message` event. Check those tests, and check code of your own that listens for `message` events on the window and does not filter by its data.
