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

import { defineConfig } from "vite";

import packageJson from "./package.json" with { type: "json" };

const umdName = packageJson.name
  .replace(/^(@(.+)\/)?(.+)$/, "$2-$3")
  .split("-")
  .map((namePart) =>
    namePart.slice(0, 1).toUpperCase().concat(namePart.slice(1)),
  )
  .join("");

// Vite customizations can go in this file. These will override those provided by the stack.
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
      entry: `${__dirname}/src/index.ts`,
      fileName: (format) =>
        `index.${format}.${format === "umd" ? "cjs" : "js"}`,
      formats: ["es", "iife", "umd"],
      name: umdName,
    },
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
}));
