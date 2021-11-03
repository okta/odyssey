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

const StyleDictionary = require("style-dictionary");
const packageJson = require("../package.json");

function build(options) {
  const sd = StyleDictionary.extend(options);
  sd.buildAllPlatforms(options);
}

build({
  source: ["src/**/*.json"],
  platforms: {
    js: {
      transformGroup: "js",
      files: [
        {
          format: "javascript/es6",
          destination: packageJson.main,
        },
        {
          format: "typescript/es6-declarations",
          destination: "dist/js/tokens.d.ts",
        },
      ],
    },
    css: {
      transformGroup: "css",
      files: [
        {
          format: "css/variables",
          destination: "dist/css/tokens.css",
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      files: [
        {
          destination: "dist/scss/tokens.scss",
          format: "scss/map-deep",
          mapName: "ods-tokens",
        },
      ],
    },
  },
});
