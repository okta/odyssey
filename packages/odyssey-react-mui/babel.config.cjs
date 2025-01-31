/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const presetEnvConfig = {
  esm: {
    modules: false,
  },
  cjs: {},
  node: {
    targets: {
      node: "current",
    },
  },
};

/**
 * @type {(api: import('@babel/core').ConfigAPI) => import('@babel/core').TransformOptions}
 */
const babelConfig = (api) => {
  // @ts-expect-error Something is wrong with this type as this function does exist.
  api.cache(true);

  return {
    plugins: [
      [
        "babel-plugin-import",
        {
          libraryName: "@mui/material",
          libraryDirectory: "",
          camel2DashComponentName: false,
        },
        "core",
      ],
      [
        "babel-plugin-import",
        {
          libraryName: "@mui/icons-material",
          libraryDirectory: "",
          camel2DashComponentName: false,
        },
        "icons",
      ],
    ],
    presets: [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
      "@babel/preset-typescript",
    ],

    env: {
      production: {
        comments: false,
        ignore: [/\.test\.|\.stories\./i],
        plugins: [
          [
            "babel-plugin-import",
            {
              libraryName: "@mui/material",
              libraryDirectory: "",
              camel2DashComponentName: false,
            },
            "core",
          ],
          [
            "babel-plugin-import",
            {
              libraryName: "@mui/icons-material",
              libraryDirectory: "",
              camel2DashComponentName: false,
            },
            "icons",
          ],
          [
            "replace-import-extension",
            process.env.ODYSSEY_CJS_BUILD
              ? {
                  extMapping: { ".js": ".cjs" },
                }
              : {
                  extMapping: { ".js": ".mjs" },
                },
          ],
        ],
        presets: [
          [
            "@babel/preset-env",
            presetEnvConfig[process.env.ODYSSEY_BUILD_MODE],
          ],
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
          "@babel/preset-typescript",
        ],
        shouldPrintComment: (val) => {
          return /Okta, Inc\.|@license|@preserve/.test(val);
        },
      },
    },
  };
};

module.exports = babelConfig;
