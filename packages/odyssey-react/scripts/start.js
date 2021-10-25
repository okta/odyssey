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

const { spawn } = require("child_process");

const source = spawn("yarn", ["build:source", "--watch"]);
const types = spawn("yarn", ["build:types", "--watch"]);

[types, source].forEach((child) => {
  child.stdout.setEncoding("utf-8");
  child.stderr.setEncoding("utf-8");

  child.stdout.on("data", console.log.bind(console));
  child.stderr.on("data", console.error.bind(console));

  child.on("error", console.error.bind(console));

  child.on("close", process.exit.bind(process, 1));
});
