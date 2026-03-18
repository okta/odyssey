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

import { access, readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const contributionsDirectory = join(__dirname, "../../../../contributions");

export const getContributionPackageSourceAliases = () =>
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
      contributionPackagePaths
        .filter(({ packageName }) => Boolean(packageName))
        .reduce(
          (packageAliases, { packageName, sourcePath }) => ({
            ...packageAliases,
            [packageName]: sourcePath,
          }),
          {},
        ),
    ),
  );

/** Escapes special RegExp characters so the string can be used in `new RegExp()`. */
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const odysseyReactMuiRootDirectory = resolve(
  __dirname,
  "../../../../core/odyssey-react-mui",
);

/**
 * Reads the `exports` field of `odyssey-react-mui`'s `package.json` to create aliases for each export path to its corresponding source file in `src/`.
 *
 * @example
 * ```ts
 * // resolves to:
 * [
 *   { find: '@okta/odyssey-react-mui/__internal', replacement: '/<path_to_repo>/packages/core/odyssey-react-mui/src/__internal.tsx' },
 *   { find: '@okta/odyssey-react-mui/icons': 'replacement: /<path_to_repo>/packages/core/odyssey-react-mui/src/icons.generated/index.ts' },
 *   { find: '@okta/odyssey-react-mui': replacement: '/<path_to_repo>/packages/core/odyssey-react-mui/src/index.ts' }
 * ]
 * ```
 */
export const getOdysseyReactMuiAliases = (): Promise<
  { find: RegExp | string; replacement: string }[]
> =>
  readFile(resolve(odysseyReactMuiRootDirectory, "package.json"), "utf8").then(
    (packageJson) => {
      // Get exports object from package.json
      const { exports } = JSON.parse(packageJson) as {
        exports: Record<string, { types: string } | string>;
      };

      return Promise.all(
        Object.entries(exports)
          // Skip exports that are not strings or objects with a "types" field, since they don't correspond to source files we can alias to.
          .filter(
            (entry) =>
              typeof entry[1] === "string" ||
              (typeof entry[1] === "object" &&
                entry[1] !== null &&
                "types" in entry[1]),
          )
          .toSorted(
            ([, a], [, b]) =>
              Number(typeof a !== "string") - Number(typeof b !== "string"),
          )
          // Map each export entry to { find, replacement }, where:
          // - find is the export path prefixed with the package name (ex. `@okta/odyssey-react-mui/icons`)
          // - replacement is the path to the corresponding source file in `src/` (ex. `/<path_to_repo>/packages/core/odyssey-react-mui/src/icons.generated/index.ts`)
          .map(([exportPath, exportValue]) => {
            const alias = join("@okta/odyssey-react-mui", exportPath);

            if (typeof exportValue === "string") {
              return Promise.resolve({
                find: new RegExp(`^${escapeRegExp(alias)}`),
                replacement: resolve(odysseyReactMuiRootDirectory, exportValue),
              });
            }

            const sourcePath = exportValue.types
              .replace("./dist/types/", "./src/")
              .replace(/\.d\.ts$/, ".ts");

            const resolvedTs = resolve(
              odysseyReactMuiRootDirectory,
              sourcePath,
            );

            return access(resolvedTs)
              .then(() => ({ find: alias, replacement: resolvedTs }))
              .catch(() => ({
                find: alias,
                replacement: `${resolvedTs}x`,
              }));
          }),
      ).catch((error) => {
        console.error(
          "Failed to generate @okta/odyssey-react-mui aliases:",
          error,
        );
        return [];
      });
    },
  );
