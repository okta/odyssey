/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { odysseyDisplayNameVersionPlugin } from "@okta/odyssey-build-tooling/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { getOdysseyReactMuiAliases } from "./src/tools/getPackageAliases.js";

const isDev =
  process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "production";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  if (!isDev) {
    return { plugins: [react()] };
  }

  // In dev mode, alias @okta/odyssey-react-mui to its TypeScript source so Vite
  // processes it directly (fixes styled_default errors). This does not require
  // core/odyssey-react-mui to be rebuilt on changes — they are picked up automatically.
  // The displayName version plugin stamps the Odyssey version into every displayName.
  return {
    resolve: {
      alias: await getOdysseyReactMuiAliases(),
    },
    plugins: [react(), odysseyDisplayNameVersionPlugin()],
  };
});
