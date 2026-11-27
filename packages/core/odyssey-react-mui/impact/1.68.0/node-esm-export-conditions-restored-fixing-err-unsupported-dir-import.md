---
summary: Node ESM export conditions restored, fixing `ERR_UNSUPPORTED_DIR_IMPORT`
affectedExports:
  - OdysseyProvider
files:
  - packages/core/odyssey-react-mui/package.json
commit: f44c77854
onlyRelevantIf: the package is imported from a Node environment and the consumer is coming from a version between 1.62.2 and 1.67.0
---

The `node` and `default` export conditions are restored, so a Node ESM consumer resolves to the CommonJS build again and the `ERR_UNSUPPORTED_DIR_IMPORT` failure that 1.62.2 introduced stops. They are declared on ten subpaths where the pre-1.62.2 manifest had eight, so `./icon-names` and `./lazy-loaded-icons` now route to CommonJS under Node as well. A consumer who worked around the break, for example with `server.deps.inline` in a vitest config or a resolution alias, is now carrying a workaround that is no longer needed and may itself change which build gets loaded.
