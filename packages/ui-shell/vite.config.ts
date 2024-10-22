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
import { join } from "node:path";
import { defineConfig, type PluginOption } from "vite";
import dts from "vite-plugin-dts";

const replaceProcessEnvPlugin = (): PluginOption => ({
  name: "replace-process-env",
  transform(code) {
    if (code.includes("process.env.NODE_ENV")) {
      return {
        code: code.replace(
          /process\.env\.NODE_ENV/g,
          JSON.stringify("production"),
        ),
        map: null,
      };
    }

    return null;
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: join(__dirname, "./src/index.ts"),
      fileName: (formatName) => `ui-shell.${formatName}.js`,
      formats: ["es", "iife", "umd"],
      name: "__oktaUiShell",
    },
    outDir: "./dist",
    sourcemap: true,
  },
  plugins: [
    replaceProcessEnvPlugin(),
    react(),
    dts({
      copyDtsFiles: true,
      insertTypesEntry: true,
      rollupTypes: true,
      declarationOnly: true,
    }),
  ],
});
