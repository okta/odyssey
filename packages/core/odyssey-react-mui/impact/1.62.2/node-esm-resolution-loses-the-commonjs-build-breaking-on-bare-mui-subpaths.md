---
summary: Node ESM resolution loses the CommonJS build, breaking on bare MUI subpaths
affectedExports:
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/package.json
commit: a4cc9b2c0
onlyRelevantIf: the package is imported from a Node environment rather than through a bundler, which covers a Node-resolution test suite, a server render, and any tool that loads it with Node's own ESM loader
recursUntil: 1.67.0
---

The `node` and `default` export conditions were deleted from all eight conditional subpaths, leaving `types`, `import`, and `require`. `node` is a platform condition and Node matches conditions in declaration order, so it was the only thing routing a Node ESM consumer to the CommonJS build. Without it `import` matches and the consumer gets the ESM build, which emits bare MUI subpath specifiers such as `@mui/material/Accordion`. MUI 5.18.0 ships no `exports` map, so that specifier is a directory, and Node's ESM loader refuses it with `ERR_UNSUPPORTED_DIR_IMPORT` where a bundler resolves it without complaint. Grepping MUI's package for that path finds it, because `babel-plugin-import` synthesizes the subpath at build time into `dist/esm/Accordion.js`; the specifier is real and it is the directory resolution that fails. The failure is at module load, so it takes out the whole suite or render rather than one component, and nothing in the consumer's own source changed. The commit subject, `feat: create odyssey mcp`, does not mention packaging. This holds from 1.62.2 through 1.67.0 and is restored in 1.68.0.
