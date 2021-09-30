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

import type { TransformOptions } from "@babel/core";
import type { Configuration } from "webpack";
import type { PropItem } from "react-docgen-typescript";
import sass from "sass";
import postcss from "postcss";

const isProduction = process.env.NODE_ENV === "production";
const withStyles = /\/(Banner|Button|Checkbox|Infobox)\.module\.scss$/;

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: PropItem) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
        },
      },
    },
    "@pxblue/storybook-rtl-addon",
  ],
  babel(config: TransformOptions) {
    const overrides = isProduction
      ? {
          plugins: [
            [
              require.resolve("@okta/odyssey-transform-styles-babel-plugin"),
              {
                extensions: [withStyles],
              },
            ],
            ...(config.plugins || []),
          ],
        }
      : {};

    return {
      ...config,
      ...overrides,
      babelrc: false,
      configFile: false,
    };
  },
  webpackFinal(config: Configuration = {}) {
    const exclude = isProduction ? [withStyles] : [];

    config.module?.rules?.push({
      test: /\.scss$/,
      exclude,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: {
              auto: true,
              localIdentName: "ods-[folder]-[local]-[hash:base64:5]",
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            implementation: sass,
            sourceMap: true,
            additionalData: `
                // Abstracts
                @import '@okta/odyssey/src/scss/abstracts/functions';
                @import '@okta/odyssey/src/scss/abstracts/colors';
                @import '@okta/odyssey/src/scss/abstracts/mixins';
                @import '@okta/odyssey/src/scss/abstracts/tokens';

                // Base
                @import '@okta/odyssey/src/scss/base/reset';
                @import '@okta/odyssey/src/scss/base/typography-global';
                @import '@okta/odyssey/src/scss/base/typography-text';

                // Components
                @import '@okta/odyssey/src/scss/components/forms';
                @import '@okta/odyssey/src/scss/components/input-field';
                @import '@okta/odyssey/src/scss/components/input-field-layout';
                @import '@okta/odyssey/src/scss/components/label';
                @import '@okta/odyssey/src/scss/components/number-input';
              `,
          },
        },
      ],
    });

    return config;
  },
};
