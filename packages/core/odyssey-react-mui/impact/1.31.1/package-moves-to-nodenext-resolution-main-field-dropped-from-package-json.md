---
summary: Package moves to NodeNext resolution, main field dropped from package.json
affectedExports:
  - OdysseyProvider
files:
  - packages/odyssey-react-mui/package.json
  - packages/odyssey-typescript/tsconfig.react.json
  - packages/odyssey-react-mui/src/index.ts
commit: 8bd71db97
---

The package moved to NodeNext module resolution. Every relative import across 283 source files gained an explicit .js extension, so the emitted ESM is now resolvable by Node's own ESM loader where it previously was not. The package.json also dropped the "main" field entirely and changed "module" from dist/index.js to dist/src/index.js. Modern resolvers honor "exports", which is unchanged, so they see no difference; a resolver that ignores "exports" previously found a "main" pointing at a file that does not exist and now finds no fallback at all. Check builds and test runners that are exports-unaware, and Jest or Vitest configs with a custom resolver. Nothing else in the 283-file sweep is behavioral: the only non-import edit is React.Fragment becoming Fragment.
