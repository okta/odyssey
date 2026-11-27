---
summary: "`NativeSelect.d.ts` imports an unresolved specifier under default lib checking"
affectedExports:
  - NativeSelect
  - ForwardRefWithType
files:
  - packages/odyssey-react-mui/package.json
  - packages/odyssey-react-mui/tsconfig.production.json
  - packages/odyssey-react-mui/src/@types/react-augment.d.ts
commit: 40dec732c
onlyRelevantIf: Odyssey's shipped declarations are compiled with `skipLibCheck` disabled
recursUntil: 1.13.1
---

`dist/src/NativeSelect.d.ts` imports the specifier `./@types/react-augment`, and `dist/src/@types/react-augment.d.ts` is absent from the published package, so the module does not resolve. The type build is `tsc --project tsconfig.production.json` with `emitDeclarationOnly`, and TypeScript produces no output for a `.d.ts` input, since a declaration file is an ambient input rather than an emit source. `tsconfig.production.json` sets `outDir` to `dist`, declares no `rootDir` and no `include`, and the build script runs only `build:clean`, `generate:i18n`, `build:types` and `build:source`, so no step copies the file. `build:source` runs babel over `src` with `--extensions .js,.jsx,.ts,.tsx`, which matches the file on `.ts` and emits `dist/@types/react-augment.d.js`, JavaScript rather than types. The package declares no `files` array and carries no `.npmignore`, so the raw tree ships and `src/@types/react-augment.d.ts` is present, but that path is on no resolution path from `types`, which names `dist/src/index.d.ts`, and is inside no `typeRoots` directory. Every `.d.ts` under `src` is affected, `src/@types/i18next.d.ts` included. The failure is TS2307 inside Odyssey's own declaration file, which `skipLibCheck` suppresses and most application configurations enable. From 1.12.4 the root barrel imports the same specifier, putting the unresolved module in the file every import from the package resolves through. Commit `31c42ef1d` removes the last importer in 1.13.2, which ends the resolution failure and leaves the emit behaviour untouched: `dist/src/@types/react-augment.d.ts` is still absent at 1.29.0.
