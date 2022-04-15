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
  webpackFinal(config) {
    const rules = buildRules(config.module.rules);
    return Object.assign({}, config, { module: { ...config.module, rules } });
  },
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@pxblue/storybook-rtl-addon",
  ],
};

function buildRules(rules) {
  return rules
    .reduce((memo, rule) => {
      const testString = rule.test?.toString();
      const isStyleLoader = /s?css/.test(testString);
      const isScriptLoader = /(jsx?|tsx?)/.test(testString);

      if (isStyleLoader) return memo;

      if (isScriptLoader) {
        const exclude = rule.exclude
          ? [/odyssey-react/].concat(rule.exclude)
          : [/odyssey-react/];

        return memo.concat(Object.assign({}, rule, { exclude }));
      }

      return memo.concat(rule);
    }, [])
    .concat({
      test: /odyssey-react\/\S+\.(jsx?|tsx?)$/,
      exclude: /node_modules/,
      loader: "@okta/odyssey-babel-loader",
      options: {
        cacheDirectory: false,
        presets: ["@okta/odyssey-babel-preset"],
      },
    });
}
