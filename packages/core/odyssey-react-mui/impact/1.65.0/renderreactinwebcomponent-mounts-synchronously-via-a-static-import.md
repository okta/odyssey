---
summary: "`renderReactInWebComponent` mounts synchronously via a static import"
affectedExports:
  - renderReactInWebComponent
  - renderUiShell
files:
  - packages/core/odyssey-react-mui/src/web-component/renderReactInWebComponent.ts
  - packages/core/odyssey-react-mui/src/ui-shell/index.ts
commit: 84e42db0a
onlyRelevantIf: the consumer imports `renderReactInWebComponent` from the `/ui-shell` entry point, or runs React 17
---

The dynamic import of the React DOM client became a static top-level import and mounting is now synchronous, so first paint no longer waits on a chunk load and the module can no longer be code-split away. The public promise field that exposed the React root is gone, and the re-export from `/ui-shell` was removed, along with the comment that flagged it as the React 17 path. The module now fails at import time rather than call time on React 17. Check mount timing, and check which entry point the import resolves through.
