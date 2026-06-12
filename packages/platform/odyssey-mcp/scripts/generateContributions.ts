import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Project } from "ts-morph";
import { z } from "zod";

import {
  extractComponentInformation,
  generatedFileHeader,
  isNonNull,
  mapValues,
  PropMetadata,
  resolveScriptPaths,
  writeGeneratedFile,
} from "./utils.js";

const { scriptsDir, repoRoot } = resolveScriptPaths(import.meta.url);
const contributionsDir = resolve(repoRoot, "packages/contributions");

export type ContributionComponentEntry = {
  componentName: string;
  description?: string;
  forkedFrom?: string;
  isIgnoredFromPromotion?: true;
  libraryName: string;
  props?: PropMetadata[];
  similarTo?: string[];
};

const HEADER = generatedFileHeader("generateContributions.ts");

const MetadataSchema = z.object({
  components: z.array(
    z.object({
      componentName: z.string(),
      libraryName: z.string(),
      isIgnoredFromPromotion: z.literal(true).optional(),
      forkedFrom: z.string().optional(),
      similarTo: z.array(z.string()).min(1).optional(),
    }),
  ),
});

type ManifestComponent = z.infer<typeof MetadataSchema>["components"][number];

type PackageManifest = {
  components: ManifestComponent[];
  packageDir: string;
  packageName: string;
};

// --- Phase 1: Read package manifests from contributions/ ---

type ReadPackageManifestArgs = { packageDir: string };

const readPackageManifest = async ({
  packageDir,
}: ReadPackageManifestArgs): Promise<PackageManifest | null> => {
  const contents = await Promise.all([
    readFile(resolve(packageDir, "contributionsMetadata.json"), "utf-8"),
    readFile(resolve(packageDir, "package.json"), "utf-8"),
  ]).catch(() => null);

  if (contents === null) {
    console.warn(
      `[generateContributions] Skipping ${packageDir}: missing contributionsMetadata.json or package.json`,
    );
    return null;
  }

  const [metadataContent, packageJsonContent] = contents;
  const metadata = MetadataSchema.parse(JSON.parse(metadataContent));
  const { name: packageName } = z
    .object({ name: z.string() })
    .parse(JSON.parse(packageJsonContent));

  if (metadata.components.length === 0) return null;

  return { packageName, packageDir, components: metadata.components };
};

const readAllPackageManifests = async (): Promise<
  Record<string, PackageManifest>
> => {
  const packageDirs = (await readdir(contributionsDir, { withFileTypes: true }))
    .filter((directoryEntry) => directoryEntry.isDirectory())
    .map((directoryEntry) => resolve(contributionsDir, directoryEntry.name));

  const manifests = await Promise.all(
    packageDirs.map((packageDir) => readPackageManifest({ packageDir })),
  );

  return Object.fromEntries(
    manifests
      .filter(isNonNull)
      .map((manifest) => [manifest.packageName, manifest]),
  );
};

// --- Phase 2: Extract props from the package's built dist/index.d.ts ---

const buildPackageEntry = (
  manifest: PackageManifest,
): ContributionComponentEntry[] => {
  const typesFilePath = resolve(manifest.packageDir, "dist/index.d.ts");

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  project.addSourceFileAtPathIfExists(typesFilePath);
  const typesSourceFile = project.getSourceFile(typesFilePath);

  if (!typesSourceFile) {
    console.warn(
      `[generateContributions] ${manifest.packageName}: no dist/index.d.ts found at ${typesFilePath} — returning manifest components as is.`,
    );
    return manifest.components;
  }

  return manifest.components.map((component) => {
    const { props, description } = extractComponentInformation({
      project,
      typesFilePath,
      componentName: component.componentName,
    });

    if (!description || props?.length === 0) {
      console.warn(
        `[generateContributions] ${manifest.packageName} - ${component.componentName}: missing description or props metadata from types — returning manifest component as is.`,
      );
    }

    return { ...component, description, props };
  });
};

// --- Entry point ---

const generate = async () => {
  const manifests = await readAllPackageManifests();

  const manifestValues = Object.values(manifests);
  console.info(
    `[generateContributions] Found ${manifestValues.length} packages.`,
  );

  console.info(`[generateContributions] Generating component metadata...`);

  const contributionsPackages = mapValues(manifests, buildPackageEntry);

  const contributionsContent = `${HEADER}import type { ContributionComponentEntry } from "./metadata-types.js";

export const contributionsPackages: Record<string, ContributionComponentEntry[]> = ${JSON.stringify(contributionsPackages, null, 2)};
`;

  await writeGeneratedFile({
    scriptsDir,
    scriptName: "generateContributions.ts",
    outputFileName: "contributions.generated.ts",
    content: contributionsContent,
  });
};

await generate();
