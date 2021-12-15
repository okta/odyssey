/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { PluginCreator } from "postcss";
import type { CssNanoOptions } from "cssnano";
import type { Options as AutoPrefixerOptions } from "autoprefixer";
import type PostcssModulesPlugin from "postcss-modules";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import postcssLogical from "postcss-logical";
import type { LogicalOptions } from "postcss-logical";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import postcssTheme from "@okta/odyssey-postcss-theme";

interface PluginOptions {
  logical?: LogicalOptions;
  cssnano?: CssNanoOptions;
  autoprefixer?: AutoPrefixerOptions;
  modules?: Parameters<PostcssModulesPlugin>[number];
  theme?: false;
}

const plugin: PluginCreator<PluginOptions> = (optsArgs = {}) => {
  const opts: Required<PluginOptions> = {
    logical: {
      dir: false,
      preserve: false,
      ...optsArgs.logical,
    },
    modules: {
      generateScopedName: "ods-[hash:hex:6]",
      ...optsArgs.modules,
    },
    cssnano: {
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
      ...optsArgs.cssnano,
    },
    autoprefixer: {
      ...optsArgs.autoprefixer,
    },
    theme: !!optsArgs.theme,
  };

  const plugins = [
    optsArgs.logical !== false && postcssLogical(opts.logical),
    optsArgs.modules !== false && postcssModules(opts.modules),
    optsArgs.cssnano !== false &&
      (cssnano(opts.cssnano) as PluginCreator<CssNanoOptions>),
    optsArgs.autoprefixer !== false && autoprefixer(opts.autoprefixer),
    optsArgs.theme !== false && postcssTheme(),
  ].filter(Boolean);

  return postcss(plugins);
};

plugin.postcss = true;
export { plugin as default };
