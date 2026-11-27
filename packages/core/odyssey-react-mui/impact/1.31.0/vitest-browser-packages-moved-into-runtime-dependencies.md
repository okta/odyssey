---
summary: Vitest browser packages moved into runtime dependencies
affectedExports:
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/package.json
commit: 4db74b617
recursUntil: 1.31.1
---

@vitest/browser and @vitest/ui are listed under runtime dependencies, not devDependencies, so every consumer install pulls vitest's browser runner and web UI into their production tree. Check install size, and check for a resolution conflict with the consumer's own vitest version. This is fixed at 1.31.2, so the affected releases are exactly 1.31.0 and 1.31.1. The subject line of the commit that introduced it describes removing legacy packages and says nothing about dependencies.
