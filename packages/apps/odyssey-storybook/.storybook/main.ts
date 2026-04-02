/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { StorybookConfig } from "@storybook/react-vite";

import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(join(value, "package.json")));
};

const config: StorybookConfig = {
  addons: [
    {
      name: getAbsolutePath("@storybook/addon-docs"),
      options: {
        transcludeMarkdown: true,
      },
    },
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    "storybook-addon-rtl",
    getAbsolutePath("storybook-addon-tag-badges"),
  ],

  core: {
    disableTelemetry: true,
  },

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  staticDirs: ["../src/static"],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  typescript: {
    check: false,
    reactDocgen: false,
  },

  // BUILD_BASE is set by publish-storybook.sh so asset URLs resolve under the
  // CDN sub-path (e.g. /storybook). Defaults to undefined (Vite root) for local dev.
  viteFinal: (config) => ({
    ...config,
    base: process.env.BUILD_BASE ?? config.base,
  }),
};

export default config;
