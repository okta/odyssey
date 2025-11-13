// This was originally copied over from `@okta/ui-build-tools` own internal node script:
// https://github.com/okta/ui-build-tools/blob/main/packages/clis/i18n/properties-to-json.js

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import properties from "properties";
import { type CommandModule } from "yargs";

import { getLogger } from "../utils";

export type BuildTranslationsJsonArgs = {
  jsonOutputPath: string;
  propertiesFilesPath: string;
};

type PropertiesJson = Record<string, unknown>;

function parseProperties(data: string): Promise<PropertiesJson> {
  return new Promise((resolve, reject) => {
    properties.parse(data, (error, propertiesJson) => {
      if (error) {
        return reject(error);
      }

      resolve(propertiesJson || {});
    });
  });
}

const log = getLogger("translations-json");

const convertPropertiesToJson = async ({
  jsonOutputPath,
  propertiesFilesPath,
}: BuildTranslationsJsonArgs) => {
  const sourceDirectory = resolve(propertiesFilesPath);
  const outputDirectory = resolve(jsonOutputPath);

  if (!existsSync(sourceDirectory)) {
    log.warn(
      `Translations are not yet setup.

If translations are required for your project, run the following command:
\`odyssey-cli initialize:i18n\``,
    );

    return;
  }

  const allFilePaths = await readdir(sourceDirectory, { recursive: true });

  const propertyFilePaths = allFilePaths.filter((filePath) =>
    filePath.endsWith(".properties"),
  );

  if (propertyFilePaths.length === 0) {
    throw new Error("No `.properties` files found to convert.");
  }

  log.info("Starting conversion of `.properties` files to TypeScript...");

  // clean and create the output directory
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  const conversionPromises = propertyFilePaths.map(async (relativePath) => {
    const fullPath = join(sourceDirectory, relativePath);
    const extension = extname(relativePath);
    const filename = basename(relativePath, extension);

    const sourceContent = await readFile(fullPath, "utf-8");

    const propertiesJson = await parseProperties(sourceContent);

    const tsContent = `export const translation = ${JSON.stringify(propertiesJson)} as const;`;
    const targetFile = join(outputDirectory, `${filename}.ts`);

    await writeFile(targetFile, tsContent);
  });

  await Promise.all(conversionPromises);

  log.info(
    `Finished conversion of ${propertyFilePaths.length} \`.properties\` files!`,
  );
};

export const buildTranslationsJsonCommand: CommandModule<
  object,
  BuildTranslationsJsonArgs
> = {
  builder: (yargs) =>
    yargs
      .option("propertiesFilesPath", {
        default: "src/properties",
        describe: "A relative path to resources based on cwd.",
        type: "string",
      })
      .option("jsonOutputPath", {
        default: "src/properties/ts",
        describe: "A relative path to directory for ts file output",
        type: "string",
      }),
  command: "build:translationsJson",
  describe: "Converts `properties` files to TypeScript types.",
  handler: convertPropertiesToJson,
};
