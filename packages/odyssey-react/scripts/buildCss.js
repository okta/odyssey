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

const { writeFileSync } = require("fs");
const { resolve } = require("path");
const { renderSync } = require("sass");

const scssFiles =
  `abstracts/functions abstracts/colors abstracts/mixins abstracts/tokens base/reset base/typography-global base/typography-text`.split(
    " "
  );
const importDir = resolve(require.resolve("@okta/odyssey"), "..");
const scssData = scssFiles
  .map((scssFile) => `@import '${importDir}/${scssFile}';`)
  .join("\n");

const { css } = renderSync({ data: scssData });
const cssFilePath = resolve(
  __dirname,
  "../dist",
  "odyssey-deprecated-global.css"
);

writeFileSync(cssFilePath, css);
