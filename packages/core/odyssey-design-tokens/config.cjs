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

module.exports = {
  source: ["src/**/*.json"],
  platforms: {
    js: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [
        {
          format: "javascript/es6",
          destination: "index.mjs",
        },
        {
          format: "javascript/module-flat",
          destination: "index.cjs",
        },
        {
          format: "typescript/es6-declarations",
          destination: "index.d.ts",
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "dist/",
      files: [
        {
          format: "scss/map-deep",
          destination: "index.scss",
          mapName: "ods-tokens",
        },
      ],
    },
  },
};
