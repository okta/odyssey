import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Project } from "ts-morph";

import type { ComponentMetadata } from "../src/metadata-types.js";

import {
  extractComponentInformation,
  extractDeprecatedExports,
  generatedFileHeader,
  resolveScriptPaths,
  writeGeneratedFile,
} from "./utils.js";

const { scriptsDir, repoRoot } = resolveScriptPaths(import.meta.url);
const reactMuiDir = resolve(repoRoot, "packages/core/odyssey-react-mui");
const srcDir = resolve(reactMuiDir, "src");
const distTypesDir = resolve(reactMuiDir, "dist/types");
const tsConfigPath = resolve(reactMuiDir, "tsconfig.json");

const HEADER = generatedFileHeader("generateMetadata.ts");

const tsMorphProject = new Project({ tsConfigFilePath: tsConfigPath });

// --- Phase 1: Discover component modules from odyssey-react-mui ---

type ComponentModule = {
  relativePath: string;
  srcPath: string;
  typesPath: string;
};

const resolveTypesFile = (relativePath: string): string =>
  resolve(distTypesDir, `${relativePath}.d.ts`);

const extractSourceFilePaths = async (): Promise<ComponentModule[]> => {
  const indexContent = await readFile(resolve(srcDir, "index.ts"), "utf-8");
  const relativePaths = Array.from(
    new Set(
      Array.from(
        indexContent.matchAll(/from "\.\/([^"]+)\.js"/g),
        (importMatch) => importMatch[1],
      ),
    ),
  );

  return relativePaths.map((relativePath) => ({
    relativePath,
    srcPath: resolve(srcDir, `${relativePath}.tsx`),
    typesPath: resolveTypesFile(relativePath),
  }));
};

// --- Phase 2: Extract prop metadata and component descriptions ---

type BuildMetadataRecordArgs = {
  modules: ComponentModule[];
};

const buildMetadataRecord = ({
  modules,
}: BuildMetadataRecordArgs): Record<string, ComponentMetadata> => {
  const entries = modules.flatMap(({ srcPath, typesPath, relativePath }) => {
    tsMorphProject.addSourceFileAtPathIfExists(typesPath);
    const typesSourceFile = tsMorphProject.getSourceFile(typesPath);

    if (!typesSourceFile) {
      console.warn(
        `[generateMetadata] Skipping ${relativePath}: no .d.ts at ${typesPath}`,
      );
      return [];
    }

    // Find all exported type aliases/interfaces named *Props in this .d.ts.
    const propsTypeNames = [
      ...typesSourceFile.getTypeAliases(),
      ...typesSourceFile.getInterfaces(),
    ]
      .filter(
        (declaration) =>
          declaration.isExported() && declaration.getName().endsWith("Props"),
      )
      .map((declaration) => declaration.getName());

    return propsTypeNames.map((propsTypeName) => {
      const componentName = propsTypeName.replace(/Props$/, "");

      const componentInformation = extractComponentInformation({
        project: tsMorphProject,
        typesFilePath: typesPath,
        sourceFilePath: srcPath,
        componentName,
      });

      return [componentName, componentInformation] as const;
    });
  });

  return Object.fromEntries(entries);
};

// --- Phase 2b: Stub entries for deprecated re-exports with no component metadata ---

const buildDeprecatedStubs = (
  existingMetadata: Record<string, ComponentMetadata>,
): Record<string, ComponentMetadata> => {
  const indexFile = tsMorphProject.addSourceFileAtPathIfExists(
    resolve(srcDir, "index.ts"),
  );
  const labsFile = tsMorphProject.addSourceFileAtPathIfExists(
    resolve(srcDir, "labs/index.ts"),
  );

  const deprecatedExports = [
    ...extractDeprecatedExports(indexFile),
    ...extractDeprecatedExports(labsFile),
  ];

  return Object.fromEntries(
    deprecatedExports
      .filter(({ name }) => !(name in existingMetadata))
      .map(({ name, message }) => [
        name,
        { description: "", deprecated: message, props: [] },
      ]),
  );
};

// --- Phase 3: Serialize metadata to TypeScript source ---

const serializeMetadata = (
  metadata: Record<string, ComponentMetadata>,
): string =>
  `${HEADER}import type { ComponentMetadata } from "./metadata-types.js";

export const componentMetadata: Record<string, ComponentMetadata> = ${JSON.stringify(metadata, null, 2)};
`;

// --- Entry point ---

const generate = async () => {
  const modules = await extractSourceFilePaths();

  console.info(
    `[generateMetadata] Parsing ${modules.length} modules from dist/types/...`,
  );

  const metadata = buildMetadataRecord({ modules });
  const stubs = buildDeprecatedStubs(metadata);
  const allMetadata = { ...metadata, ...stubs };

  console.info(
    `[generateMetadata] Found ${Object.keys(metadata).length} components, ${Object.keys(stubs).length} deprecated stubs.`,
  );

  await writeGeneratedFile({
    scriptsDir,
    scriptName: "generateMetadata.ts",
    outputFileName: "components.generated.ts",
    content: serializeMetadata(allMetadata),
  });
};

await generate();
