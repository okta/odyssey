#!/usr/bin/env node
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

// This was originally copied over from @okta/ui-build-tools' own internal node script:
// https://github.com/okta/ui-build-tools/blob/main/packages/clis/i18n/properties-to-json.js

import { basename, extname, join, resolve } from "node:path";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { readdir } from "node:fs/promises";
import properties from "properties";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const convert = (baseFiles: string[], propertiesTargetDir: string) => {
  baseFiles.forEach((src) => {
    const extension = extname(src);
    const filename = basename(src, extension);
    const source = readFileSync(src).toString();

    properties.parse(source, (error, propertiesJson) => {
      if (error) {
        return console.error(error);
      }

      const targetFile = join(propertiesTargetDir, filename.concat(".ts"));

      writeFileSync(
        targetFile,
        `export const translation = ${JSON.stringify(propertiesJson)};`,
      );
    });
  });
};

const convertPropertiesToJson = async ({
  jsonOutputPath,
  propertiesFilesPath,
}: {
  jsonOutputPath: string;
  propertiesFilesPath: string;
}) => {
  const sourceDirectory = resolve(propertiesFilesPath);
  const propertiesTargetDirectory = resolve(jsonOutputPath);

  if (!existsSync(sourceDirectory)) {
    mkdirSync(sourceDirectory);
  }

  if (existsSync(propertiesTargetDirectory)) {
    rmSync(propertiesTargetDirectory, { recursive: true, force: true });
  }
  mkdirSync(propertiesTargetDirectory);

  const propertiesFilePaths = await readdir(sourceDirectory, {
    recursive: true,
  });

  convert(
    propertiesFilePaths
      .filter((propertiesFilePath) =>
        propertiesFilePath.endsWith(".properties"),
      )
      .map((propertiesFilePath) => join(sourceDirectory, propertiesFilePath)),
    propertiesTargetDirectory,
  );
};

yargs(hideBin(process.argv))
  .scriptName("properties-to-ts")
  .usage("$0 <cmd> [args]")
  .command(
    "bundle [propertiesFilesPath] [jsonOutputPath]",
    "Converts `properties` files to TypeScript types.",
    (yargs) =>
      yargs
        .positional("propertiesFilesPath", {
          default: "src/properties",
          describe: "A relative path to resources based on cwd.",
          type: "string",
        })
        .positional("jsonOutputPath", {
          default: "src/properties/ts",
          describe: "A relative path to directory for ts file output",
          type: "string",
        }),
    (argv) => {
      convertPropertiesToJson({
        jsonOutputPath: argv.jsonOutputPath,
        propertiesFilesPath: argv.propertiesFilesPath,
      });
    },
  )
  .strictCommands()
  .demandCommand(1)
  .parse();
