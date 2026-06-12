import type { AllComponentEntry } from "../src/metadata-types.js";

// tsx resolves .js → .ts, so these import from the already-generated .ts source files.
// This script must run after generate:components and generate:contributions.
import { componentMetadata } from "../src/components.generated.js";
import { contributionsPackages } from "../src/contributions.generated.js";
import {
  generatedFileHeader,
  mapValues,
  resolveScriptPaths,
  writeGeneratedFile,
} from "./utils.js";

const { scriptsDir } = resolveScriptPaths(import.meta.url);
const HEADER = generatedFileHeader("generateAllComponents.ts");

const generate = async () => {
  const coreComponents = mapValues(
    componentMetadata,
    (componentEntry, componentName): AllComponentEntry => ({
      name: componentName,
      packageName: "@okta/odyssey-react-mui",
      description: componentEntry.description,
      isContribution: false,
      props: componentEntry.props,
      deprecated: componentEntry.deprecated,
    }),
  );

  // flatMap unwraps the per-package component arrays into a single [key, entry] list.
  // Components without parsed docs (empty description and no props) are skipped — they'd
  // be noise in the MCP search index.
  const contributionEntries = Object.entries(contributionsPackages).flatMap(
    ([packageName, components]) =>
      components
        .filter(
          (contributionComponent) =>
            contributionComponent.description !== "" ||
            Boolean(contributionComponent.props?.length),
        )
        .map((contributionComponent): [string, AllComponentEntry] => [
          `${packageName}::${contributionComponent.componentName}`,
          {
            name: contributionComponent.componentName,
            packageName,
            description: contributionComponent.description,
            isContribution: true,
            props: contributionComponent.props,
          },
        ]),
  );

  const allComponentMetadataData: Record<string, AllComponentEntry> = {
    ...coreComponents,
    ...Object.fromEntries(contributionEntries),
  };

  const content = `${HEADER}import type { AllComponentEntry } from "./metadata-types.js";

export const allComponentMetadata: Record<string, AllComponentEntry> = ${JSON.stringify(allComponentMetadataData, null, 2)};
`;

  const coreCount = Object.keys(componentMetadata).length;
  const contributionsCount = contributionEntries.length;

  console.info(
    `[generateAllComponents] Unified ${coreCount} core + ${contributionsCount} contribution components.`,
  );

  await writeGeneratedFile({
    scriptsDir,
    scriptName: "generateAllComponents.ts",
    outputFileName: "allComponentMetadata.generated.ts",
    content,
  });
};

await generate();
