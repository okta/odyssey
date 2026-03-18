# @okta/odyssey-contribution-tooling

A centralized utility package that holds various tools to be used across Odyssey packages.

## Tools

- [Translation Services](#-translation-services)

## 🌐 Translation Services

The primary goal of this tool is to provide a function, `getTranslationServices`, that returns a suite of
`react-i18next` utilities:

- `useTranslation`: A strongly typed hook that is pre-bound to the given namespace. It provides autocompletion for
  translation keys and required placeholders.
- `TranslationProvider`: A pre-configured provider component that sets up the i18n context. Each instance created by
  `getTranslationServices` is completely independent, allowing for multiple, independent translation contexts to be
  nested without conflict.
- `Trans`: A component for rendering translated strings with support for interpolation and nesting React elements, while
  retaining strong typing for the translation key and placeholder values.
- `i18n`: The `i18next` instance itself, pre-configured with your resources and default language.

These utilities are automatically and strongly typed, giving the consumer full autocompletion and compile-time safety
for translation keys and their required placeholders based on their own resource files.

This tool is _not_ meant to be configured manually within consuming packages. Instead, a generation script uses it to
produce a standardized, pre-configured `i18n.generated/i18n.ts` file. See
the [odyssey-cli](../../tools/odyssey-cli/README.md#generatei18n) package for more information on the generation
process.

Below is an example of the auto-generated file produced by this tooling:

```ts
import {
  getTranslationServices,
  TypedTFunction,
} from "@okta/odyssey-contribution-tooling";

import { resources } from "./i18n.resources.js";
import {
  defaultLanguageCode,
  i18nResourceType,
  namespace,
} from "./i18n.types.js";

export type * from "@okta/odyssey-contribution-tooling";

export const { i18n, Trans, TranslationProvider, useTranslation } =
  getTranslationServices({
    defaultLanguageCode,
    namespace,
    resources,
  });

export const translate = i18n.t.bind(i18n) as TypedTFunction<i18nResourceType>;
```

### 📌 Dependency Notes

> `react-i18next@15.4.1`

The `react-i18next` package is intentionally pinned to version `15.4.1`. Version `15.5.0` and later require
**TypeScript v5**, which would be a breaking change for consuming packages that have not yet upgraded from **TypeScript
v4**. This pin ensures continued compatibility.
