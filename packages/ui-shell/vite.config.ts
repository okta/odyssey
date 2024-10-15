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

import { join } from "node:path";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";

const replaceProcessEnvPlugin = (): PluginOption => ({
  name: "replace-process-env",
  transform(code) {
    if (code.includes("process.env.NODE_ENV")) {
      return code.replace(
        /process\.env\.NODE_ENV/g,
        JSON.stringify("production"),
      );
    }

    return code;
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./dist",
    lib: {
      entry: join(__dirname, "./src/index.ts"),
      fileName: (format) => `ui-shell.${format}.js`,
      formats: ["es", "iife", "umd"],
      name: "OktaUiShell",
    },
  },
  plugins: [react(), replaceProcessEnvPlugin()],
});
