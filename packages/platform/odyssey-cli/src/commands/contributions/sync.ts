import {
  calculateMetadataCompletenessValidation,
  type ContributionsMetadataEntry,
  type ContributionsPackage,
  findContributionsPackages,
  getExportedComponentNames,
  METADATA_FILENAME,
  readMetadataFile,
} from "@okta/odyssey-contributions-promotion-check";
import {
  autocomplete,
  autocompleteMultiselect,
  cancel,
  confirm,
  group,
  intro,
  isCancel,
  log,
  note,
  outro,
  select,
} from "@okta/odyssey-prompts";
import { execSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

type ComponentReferenceOption = { label: string; value: string };

type GetComponentReferenceOptionsArgs = {
  contributionsPackages: ContributionsPackage[];
  coreIndexPath: string;
};

type ComponentGroupAnswers = {
  forkedFrom?: string;
  hasSimilar?: boolean;
  isForked?: boolean;
  isIgnored: boolean;
  similarTo?: string[];
};

type GetMetadataEntryArgs = {
  answers: ComponentGroupAnswers;
  componentName: string;
  libraryName: string;
};

type ComponentPromptsArgs = {
  componentName: string;
  componentReferenceOptions: ComponentReferenceOption[];
  index: number;
  libraryName: string;
  total: number;
};

const getComponentReferenceOption = (
  componentReference: string,
): ComponentReferenceOption => {
  const [libraryName, componentName] = componentReference.split("::");
  return {
    value: componentReference,
    label: componentName
      ? `${componentName} — ${libraryName}`
      : componentReference,
  };
};

const getComponentReferenceOptions = async ({
  contributionsPackages,
  coreIndexPath,
}: GetComponentReferenceOptionsArgs): Promise<ComponentReferenceOption[]> => {
  const metadataFiles = await Promise.all(
    contributionsPackages.map(({ metadataPath }) =>
      readMetadataFile(metadataPath),
    ),
  );

  const coreComponentReferences = [
    ...getExportedComponentNames(coreIndexPath),
  ].map((componentName) => `odyssey-react-mui::${componentName}`);

  const metadataReferences = metadataFiles.flatMap((metadata) =>
    metadata.components.flatMap((entry) => [
      `${entry.libraryName}::${entry.componentName}`,
      ...(entry.forkedFrom ? [entry.forkedFrom] : []),
      ...(entry.similarTo ?? []),
    ]),
  );

  return [...new Set([...coreComponentReferences, ...metadataReferences])]
    .toSorted()
    .map(getComponentReferenceOption);
};

const getMetadataEntry = ({
  componentName,
  libraryName,
  answers,
}: GetMetadataEntryArgs): ContributionsMetadataEntry => {
  if (answers.isIgnored) {
    return { componentName, libraryName, isIgnoredFromPromotion: true };
  }

  if (answers.forkedFrom) {
    return { componentName, libraryName, forkedFrom: answers.forkedFrom };
  }

  if (answers.similarTo && answers.similarTo.length > 0) {
    return { componentName, libraryName, similarTo: answers.similarTo };
  }

  return { componentName, libraryName };
};

const componentPrompts = async ({
  componentName,
  libraryName,
  index,
  total,
  componentReferenceOptions,
}: ComponentPromptsArgs): Promise<ContributionsMetadataEntry> => {
  note(
    `Component ${index} of ${total}: ${componentName}`,
    `Missing from ${METADATA_FILENAME}`,
  );

  const answers = (await group(
    {
      isIgnored: () =>
        confirm({
          message: `Ignore ${componentName} from promotion tracking? (e.g. example or test-only components)`,
          initialValue: false,
        }),
      isForked: ({ results }) =>
        !results.isIgnored
          ? confirm({
              message: `Was ${componentName} copied (forked) from an existing component?`,
              initialValue: false,
            })
          : undefined,
      forkedFrom: ({ results }) =>
        results.isForked
          ? autocomplete({
              message: "Source component:",
              options: componentReferenceOptions,
              placeholder: "Type to search...",
            })
          : undefined,
      hasSimilar: ({ results }) =>
        !results.isIgnored && !results.isForked
          ? confirm({
              message: `Is ${componentName} similar to any existing component?`,
              initialValue: false,
            })
          : undefined,
      similarTo: ({ results }) =>
        results.hasSimilar
          ? autocompleteMultiselect({
              message: "Similar components:",
              options: componentReferenceOptions,
              required: false,
              placeholder: "Type to search...",
            })
          : undefined,
    },
    {
      onCancel: () => {
        cancel("Sync cancelled.");
        process.exit(0);
      },
    },
  )) as ComponentGroupAnswers;

  return getMetadataEntry({ componentName, libraryName, answers });
};

export const sync = async (): Promise<void> => {
  intro("odyssey-cli contributions sync");

  const repoRoot = execSync("git rev-parse --show-toplevel", {
    encoding: "utf8",
  }).trim();
  const contributionsPackages = await findContributionsPackages(
    join(repoRoot, "packages", "contributions"),
  );

  const packagePath = await select({
    message: "Select a contributions package to sync:",
    options: contributionsPackages.map(({ packageDir }) => ({
      value: packageDir,
      label: basename(packageDir),
    })),
  });

  if (isCancel(packagePath)) {
    cancel("Sync cancelled.");
    process.exit(0);
  }

  const [componentReferenceOptions, metadata] = await Promise.all([
    getComponentReferenceOptions({
      contributionsPackages,
      coreIndexPath: join(
        repoRoot,
        "packages",
        "core",
        "odyssey-react-mui",
        "src",
        "index.ts",
      ),
    }),
    readMetadataFile(join(packagePath, METADATA_FILENAME)).catch(() => {
      cancel(`Could not read ${METADATA_FILENAME} at ${packagePath}`);
      process.exit(1);
    }),
  ]);

  const libraryName = basename(packagePath);

  const violations = calculateMetadataCompletenessValidation({
    metadata,
    packageDir: packagePath,
  });

  const { missingComponents, notExportedComponents } = violations.reduce<{
    missingComponents: string[];
    notExportedComponents: string[];
  }>(
    (acc, { kind, componentName }) => {
      if (kind === "exported_but_missing_from_metadata") {
        acc.missingComponents.push(componentName);
      } else if (kind === "in_metadata_but_not_exported") {
        acc.notExportedComponents.push(componentName);
      }

      return acc;
    },
    {
      missingComponents: [],
      notExportedComponents: [],
    },
  );

  if (notExportedComponents.length > 0) {
    log.warn({
      message: `In metadata but not exported — review manually:\n${notExportedComponents.map((componentName) => `• ${componentName}`).join("\n")}`,
    });
  }

  if (missingComponents.length === 0) {
    note("All exported components are already in metadata.");
    outro("Nothing to update.");
    return;
  }

  log.info({
    message: `${missingComponents.length} component(s) missing from metadata:\n${missingComponents.map((componentName) => `• ${componentName}`).join("\n")}`,
  });

  const newEntries = await missingComponents.reduce(
    (chain, componentName, index) =>
      chain.then((entries) =>
        componentPrompts({
          componentName,
          libraryName,
          index: index + 1,
          total: missingComponents.length,
          componentReferenceOptions,
        }).then((entry) => entries.concat(entry)),
      ),
    Promise.resolve<ContributionsMetadataEntry[]>([]),
  );

  const updatedMetadata = {
    ...metadata,
    components: [...metadata.components, ...newEntries],
  };

  await writeFile(
    join(packagePath, METADATA_FILENAME),
    `${JSON.stringify(updatedMetadata, null, 2)}\n`,
    "utf8",
  );

  outro(
    `${METADATA_FILENAME} updated with ${newEntries.length} new entr${newEntries.length === 1 ? "y" : "ies"}.`,
  );
};
