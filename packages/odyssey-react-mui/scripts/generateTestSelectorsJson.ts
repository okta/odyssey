/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const distDirectory = join(__dirname, "../dist/test-selectors");

import("../src/test-selectors/index").then(
  ({ odysseyTestSelector: testSelector }) =>
    mkdir(distDirectory)
      .catch(() => null)
      .then(() =>
        writeFile(
          join(distDirectory, "testSelectors.json"),
          JSON.stringify(testSelector),
        ),
      ),
);
