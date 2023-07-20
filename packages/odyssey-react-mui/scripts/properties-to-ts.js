/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// Part of this has been copied over from @okta/ui-build-tools' own internal node script
// https://github.com/okta/ui-build-tools/blob/master/packages/clis/i18n/properties-to-json.js

import { resolve, join, basename, extname } from "node:path";
import {
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import properties from "properties";
import readdir from "recursive-readdir";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const convert = (baseFiles, propertiesTargetDir) => {
  for (const src of baseFiles) {
    const filename = basename(src);
    const extension = extname(src);
    const source = `${readFileSync(src)}`;

    properties.parse(source, function (error, obj) {
      if (error) {
        return console.error(error);
      }

      const targetFile = join(
        propertiesTargetDir,
        filename.replace(extension, ".ts")
      );
      writeFileSync(
        targetFile,
        `export const translation = ${JSON.stringify(obj)};`
      );
    });
  }
};

async function convertPropertiesToJson({ resourcePath, targetJsonPath }) {
  const sourceDirectory = resolve(resourcePath);
  const propertiesTargetDirectory = resolve(targetJsonPath);

  if (!existsSync(sourceDirectory)) {
    mkdirSync(sourceDirectory);
  }
  if (existsSync(propertiesTargetDirectory)) {
    rmSync(propertiesTargetDirectory, { recursive: true, force: true });
  }
  mkdirSync(propertiesTargetDirectory);

  let baseFiles = await readdir(sourceDirectory);
  convert(baseFiles, propertiesTargetDirectory);
}

yargs(hideBin(process.argv))
  .scriptName("properties-to-ts")
  .usage("$0 <cmd> [args]")
  .command(
    "bundle",
    "Converts properties file to ts",
    (yargs) => {
      yargs
        .positional("resourcePath", {
          type: "string",
          default: "src/properties",
          describe: "A relative path to resources based on cwd.",
        })
        .positional("targetJsonPath", {
          type: "string",
          default: "src/properties/ts",
          describe: "A relative path to directory for ts file output",
        });
    },
    function (argv) {
      const { resourcePath, targetJsonPath } = argv;

      convertPropertiesToJson({
        resourcePath,
        targetJsonPath,
      });
    }
  )
  .help().argv;
