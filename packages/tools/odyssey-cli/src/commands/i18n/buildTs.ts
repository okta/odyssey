// This was originally copied over from `@okta/ui-build-tools` own internal node script:
// https://github.com/okta/ui-build-tools/blob/main/packages/clis/i18n/properties-to-json.js

import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import properties from "properties";
import { type CommandModule } from "yargs";

import { getHasFileOrDirectory, getLogger, runWatchTask } from "../../utils";

export type BuildTranslationModulesArgs = {
  propertiesFilesPath: string;
  tsModuleOutputPath: string;
  watch?: boolean;
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

const convertPropertiesToTypescript = async ({
  tsModuleOutputPath,
  propertiesFilesPath,
}: BuildTranslationModulesArgs) => {
  const sourceDirectory = resolve(propertiesFilesPath);
  const outputDirectory = resolve(tsModuleOutputPath);

  const hasSourceDirectory = await getHasFileOrDirectory(sourceDirectory);
  if (!hasSourceDirectory) {
    log.warn(
      `Translations are not yet setup.

If translations are required for your project, run the following command:
\`yarn odyssey-cli i18n init\``,
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

const convertPropertiesToTypescriptWithWatch = async (
  args: BuildTranslationModulesArgs,
) => {
  await convertPropertiesToTypescript(args);

  if (args.watch) {
    runWatchTask({
      chokidarOptions: {
        ignored: (path, stats) =>
          Boolean(stats?.isFile()) && !path.endsWith(".properties"),
      },
      onChange: () => convertPropertiesToTypescript(args),
      path: resolve(args.propertiesFilesPath),
      logger: log,
    });
  }
};

export const buildTsI18nCommand: CommandModule<
  object,
  BuildTranslationModulesArgs
> = {
  builder: (yargs) =>
    yargs
      .option("propertiesFilesPath", {
        default: "src/properties",
        describe: "A relative path to resources based on cwd.",
        type: "string",
      })
      .option("tsModuleOutputPath", {
        default: "src/properties/ts",
        describe: "A relative path to directory for ts file output",
        type: "string",
      })
      .option("watch", {
        alias: "w",
        default: false,
        describe: "Watch for changes in the base .properties file and rebuild",
        type: "boolean",
      }),
  command: "build:ts",
  describe: "Converts `properties` files to TypeScript modules.",
  handler: convertPropertiesToTypescriptWithWatch,
};
