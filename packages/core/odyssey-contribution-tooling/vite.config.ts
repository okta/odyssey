/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { defineConfig, esmExternalRequirePlugin } from "vite";

import packageJson from "./package.json" with { type: "json" };

const umdName = packageJson.name
  .replace(/^(@(.+)\/)?(.+)$/, "$2-$3")
  .split("-")
  .map((namePart) =>
    namePart.slice(0, 1).toUpperCase().concat(namePart.slice(1)),
  )
  .join("");

export default defineConfig(({ command }) => ({
  define:
    command === "build"
      ? {
          "process.env.NODE_ENV": '"production"',
        }
      : {},

  build: {
    emptyOutDir: false,
    lib: {
      entry: `${import.meta.dirname}/src/index.ts`,
      fileName: (format) =>
        `index.${format}.${format === "umd" ? "cjs" : "js"}`,
      formats: ["es", "iife", "umd"],
      name: umdName,
    },
    // Matches the syntax Vite 7 emitted. Vite 8's minifier writes ES2021 `||=` and `??=` for the default browser target, which older consumer toolchains (webpack 4) cannot parse.
    target: "es2020",
    sourcemap: true,
    rolldownOptions: {
      output: {
        // Rollup always emitted "use strict" in UMD and IIFE output. Rolldown only does when the source has it.
        strict: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "react/jsx-dev-runtime": "ReactJSXDevRuntime",
        },
      },
    },
  },

  plugins: [
    // Keeps React external, and turns bundled CommonJS `require("react")` calls into imports so the ES build loads in a browser. Rolldown skips any package also in `rolldownOptions.external`, so React must not be listed there.
    esmExternalRequirePlugin({
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    }),
  ],
}));
