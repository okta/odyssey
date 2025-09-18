/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const contributionsDirectory = join(__dirname, "../../../../contributions");

export const getContributionPackagePaths = () =>
  readdir(contributionsDirectory, { withFileTypes: true }).then((dirents) =>
    Promise.all(
      dirents
        .map((dirent) => (dirent.isDirectory() ? dirent.name : null))
        .filter((directoryName) => directoryName !== null)
        .map((directoryName) => ({
          packageJsonPath: join(
            contributionsDirectory,
            directoryName,
            "package.json",
          ),
          sourcePath: join(contributionsDirectory, directoryName, "src"),
        }))
        .map(({ packageJsonPath, ...otherProps }) =>
          readFile(packageJsonPath, "utf8")
            .then((packageJsonString) => ({
              ...otherProps,
              packageName: (JSON.parse(packageJsonString) as { name: string })
                .name,
            }))
            .catch(() => ({
              ...otherProps,
              packageName: "",
            })),
        ),
    ).then((contributionPackagePaths) =>
      contributionPackagePaths.filter(({ packageName }) =>
        Boolean(packageName),
      ),
    ),
  );
