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

const branchName = process.env.GITHUB_HEAD_REF;
const parentBranchName = process.env.GITHUB_BASE_REF;
const shortCommitHash = process.env.GITHUB_SHA.slice(0, 7);

module.exports = {
  accessibilityValidation: {
    level: "AA",
    guidelinesVersion: "WCAG_2_1",
  },
  branchName,
  batch: {
    name: branchName?.concat(" ", shortCommitHash),
    notifyOnCompletion: true,
    sequenceName: "Regression",
  },
  dontCloseBatches: false,
  browser: [{ width: 1024, height: 768, name: "chrome" }],
  exitcode: true,
  matchLevel: "Strict",
  parentBranchName,
  serverUrl: "https://oktaeyes.applitools.com",
  showLogs: true,
  showStorybookOutput: true,
  testConcurrency: 5,
};
