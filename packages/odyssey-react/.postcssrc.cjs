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

const { resolve } = require("path");
const { default: postcssScss } = require("@okta/odyssey-postcss-scss");
const { default: postcssOdyssey } = require("@okta/odyssey-postcss-preset");

module.exports = (ctx) => {
  if (!ctx.odyssey) {
    return {};
  }

  const options = Object.assign(
    ctx.odyssey,
    ctx.env === "production"
      ? {
          logical: {
            dir: "ltr",
            preserve: false,
          },
          autoprefixer: {
            grid: "autoplace",
            env: "production",
          },
        }
      : {
          logical: false,
          autoprefixer: false,
          modules: {
            ...ctx.odyssey.modules,
            generateScopedName: "ods-[name]-[local]-[hash:base62:6]",
          },
        }
  );

  const partials = `functions colors mixins tokens`.split(" ");
  const importDir = resolve(__dirname, "src/scss/abstracts");
  const importData = partials
    .map((partial) => `@import '${importDir}/${partial}';`)
    .join("\n");

  return {
    plugins: [postcssScss({ importData }), postcssOdyssey(options)],
  };
};
