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

const conventionalChangelog = require("conventional-changelog-angular/conventional-changelog");
const parserOpts = require("conventional-changelog-angular/parser-opts");
const recommendedBumpOpts = require("./conventional-recommended-bump");
const writerOpts = require("conventional-changelog-angular/writer-opts");

module.exports = Promise.all([
  conventionalChangelog,
  parserOpts,
  recommendedBumpOpts,
  writerOpts,
]).then(
  ([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts]) => ({
    conventionalChangelog,
    parserOpts,
    recommendedBumpOpts,
    writerOpts,
  })
);
