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

const { ProvidePlugin } = require("webpack");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      customComponentTypes: ["PolymorphicForwardRef"],
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (!prop.parent) return true;
        return (
          /odyssey-react/.test(prop.parent.fileName) ||
          !/node_modules/.test(prop.parent.fileName)
        );
      },
    },
  },
  babel(config) {
    return Object.assign(config, {
      plugins: [
        [
          require.resolve("@okta/odyssey-transform-styles-babel-plugin"),
          {
            identityObjectProxy: true,
          },
        ],
        ...config.plugins,
      ],
      babelrc: false,
      configFile: false,
    });
  },
  webpackFinal(config) {
    return Object.assign(config, {
      plugins: [...config.plugins, new ProvidePlugin({ React: "react" })],
    });
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@pxblue/storybook-rtl-addon",
  ],
};
