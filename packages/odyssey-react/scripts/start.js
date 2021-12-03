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
const chokidar = require("chokidar");
const path = require("path");
const SRC = path.resolve(__dirname, "../src");

withIO(spawn("yarn", ["build:types", "--watch", "--preserveWatchOutput"]), {
  exitOnClose: true,
});

const watcher = chokidar.watch(`${SRC}/**/*.{ts,js,tsx,jsx,scss}`, {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 50,
    pollInterval: 10,
  },
});

["add", "change"].forEach((type) => {
  watcher.on(type, (changed) => {
    const srcDir = path.dirname(changed);
    const distDir = buildDistDir(srcDir);
    withIO(spawn("yarn", ["build:source", srcDir, distDir]));
  });
});

function withIO(child, opts = {}) {
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  if (opts.exitOnClose) {
    child.on("exit", process.exit.bind(process, 1));
  }
}

function buildDistDir(changed) {
  return path.join("dist", changed.split(SRC)[1]);
}
