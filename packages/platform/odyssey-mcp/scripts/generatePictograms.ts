import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  generatedFileHeader,
  resolveScriptPaths,
  writeGeneratedFile,
} from "./utils.js";

const { scriptsDir, repoRoot } = resolveScriptPaths(import.meta.url);
const reactMuiSrc = resolve(repoRoot, "packages/core/odyssey-react-mui/src");

const HEADER = generatedFileHeader("generatePictograms.ts");

// --- Phase 1: Read icon and logo names from generated index files ---

export const extractExportNames = (content: string): string[] =>
  [...content.matchAll(/export \* from "\.\/(\w+)\.js"/g)].map(
    ([, name]) => `${name}Icon`,
  );

const extractIconNames = async (indexPath: string): Promise<string[]> => {
  const content = await readFile(indexPath, "utf-8");
  return extractExportNames(content);
};

// --- Entry point ---

const generate = async () => {
  const [icons, logos] = await Promise.all([
    extractIconNames(resolve(reactMuiSrc, "icons.generated/index.ts")),
    extractIconNames(resolve(reactMuiSrc, "logos.generated/index.ts")),
  ]);

  console.info(
    `[generatePictograms] Found ${icons.length} icons, ${logos.length} logos.`,
  );

  const pictogramsContent = `${HEADER}
export const pictogramsByCategory: { icons: string[]; logos: string[] } = {
  icons: ${JSON.stringify(icons, null, 2)},
  logos: ${JSON.stringify(logos, null, 2)},
};

export const allPictograms: string[] = [
  ...pictogramsByCategory.icons,
  ...pictogramsByCategory.logos,
];
`;

  await writeGeneratedFile({
    scriptsDir,
    scriptName: "generatePictograms.ts",
    outputFileName: "pictograms.generated.ts",
    content: pictogramsContent,
  });
};

await generate();
