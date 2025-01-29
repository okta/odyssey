/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import react from "@vitejs/plugin-react";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        icons: "./src/icons.generated/index.ts",
        index: "./src/index.ts",
        labs: "./src/labs/index.ts",
        testSelectors: "./src/test-selectors/index.ts",
        uiShell: "./src/ui-shell/index.ts",
        webComponent: "./src/web-component/index.ts",
      },
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        entryFileNames: "[format]/[name].js",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
  define: {
    "process.env.BROWSERSLIST_ENV": JSON.stringify("modern"),
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production",
    ),
  },
  plugins: [
    react(),
    {
      name: "generateTestSelectorsJson",
      apply: "build",
      buildEnd: () => {
        const distDirectory = join(import.meta.dirname, "dist");

        import("./src/test-selectors/index.js").then(
          ({ odysseyTestSelector }) =>
            mkdir(distDirectory, { recursive: true })
              .catch(() => null)
              .then(() =>
                writeFile(
                  join(distDirectory, "testSelectors.json"),
                  JSON.stringify(odysseyTestSelector),
                ),
              )
              .then(() => {
                console.log("Test selectors written to", distDirectory);
              })
              .catch((error) => {
                console.error("Error writing Test Selectors JSON file:", error);
              }),
        );
      },
    },
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});
