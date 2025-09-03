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

const branchName = process.env.CURRENT_BRANCH_NAME || "";
const parentBranchName =
  process.env.BASE_BRANCH_NAME === "null" || !process.env.BASE_BRANCH_NAME
    ? "main"
    : process.env.BASE_BRANCH_NAME;
const commitHash = process.env.SHA || "";

const applitoolsConfig = {
  accessibilityValidation: {
    level: "AA",
    guidelinesVersion: "WCAG_2_1",
  },
  batch: {
    name: `${branchName} ${commitHash}`,
    notifyOnCompletion: true,
    sequenceName: "Regression",
  },
  branchName,
  browser: [{ width: 1024, height: 768, name: "chrome" }],
  dontCloseBatches: false,
  exitcode: true,
  matchLevel: "Strict",
  parentBranchName,
  puppeteerOptions: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  },
  runInDocker: true,
  saveNewTests: true,
  sendDom: true,
  serverUrl: "https://oktaeyes.applitools.com",
  testConcurrency: 20,
  waitBeforeCapture: 2000,
};

module.exports = applitoolsConfig;
