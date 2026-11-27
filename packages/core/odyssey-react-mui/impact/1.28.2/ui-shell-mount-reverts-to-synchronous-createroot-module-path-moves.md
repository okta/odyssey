---
summary: UI Shell mount reverts to synchronous createRoot, module path moves
affectedExports:
  - renderReactInWebComponent
  - UiShell
files:
  - packages/odyssey-react-mui/src/web-component/index.ts
  - packages/odyssey-react-mui/src/ui-shell/index.ts
  - packages/odyssey-react-mui/src/ui-shell/renderReactInWebComponent.ts
commit: 9619bad4e
---

The synchronous createRoot is restored, so the async mount behavior from 1.28.1 is gone and code that added a waitFor for it no longer needs one. The module also moved from src/web-component/ to src/ui-shell/ and the /web-component subpath stopped exporting it, which is the codemod half of this change. The move holds through 1.30.1 and is undone at 1.31.0, where the file returns to web-component/ while ui-shell/ keeps re-exporting it, so both paths work at 1.31.0 and only /ui-shell works in between.
