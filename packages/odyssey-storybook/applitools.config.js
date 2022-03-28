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

const VRT_IGNORE = "Toast.Provider Infobox.Form Infobox.Table".split(" ");

module.exports = {
  // NOTE: the docs for this exitcode config are incorrect as of this
  // writing. An explicit `false` value here allows a failed VRT run to
  // exit non zero and our larger CI build to pass as we intend.
  // Validating VRT results is then handled through a separate applitools
  // github integration.
  exitcode: false,

  matchLevel: "Strict",
  showStorybookOutput: true,
  testConcurrency: 20,
  browser: [{ width: 1024, height: 768, name: "chrome" }],
  accessibilityValidation: {
    level: "AA",
    guidelinesVersion: "WCAG_2_1",
  },
  include({ name }) {
    if (VRT_IGNORE.includes(name)) return false;
    return true;
  },
};
