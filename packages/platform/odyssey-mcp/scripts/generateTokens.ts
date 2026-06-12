import * as odysseyDesignTokens from "@okta/odyssey-design-tokens";

import {
  generatedFileHeader,
  resolveScriptPaths,
  writeGeneratedFile,
} from "./utils.js";

const { scriptsDir } = resolveScriptPaths(import.meta.url);

const HEADER = generatedFileHeader("generateTokens.ts");

type TokenValue = string | number;
type TokenEntry = [tokenName: string, tokenValue: TokenValue];
type TokensByCategory = Record<string, Record<string, TokenValue>>;

// --- Phase 1: Categorize tokens by name prefix ---

export const extractCategory = (tokenName: string): string => {
  const match = tokenName.match(/^(?<category>[A-Z][a-z]+)/);
  return match?.groups?.category?.toLowerCase() ?? "other";
};

// --- Entry point ---

const generate = () => {
  const allTokenEntries: TokenEntry[] = Object.entries(odysseyDesignTokens);

  // Build a lookup in one pass:
  //   { color: { ColorBlue500: "#0061ff", ... }, spacing: { SpacingScale1: "4px", ... } }
  const tokensByCategory: TokensByCategory =
    allTokenEntries.reduce<TokensByCategory>(
      (categoriesByName, [tokenName, tokenValue]) => {
        const category = extractCategory(tokenName);

        return {
          ...categoriesByName,
          [category]: {
            ...(categoriesByName[category] ?? {}),
            [tokenName]: tokenValue,
          },
        };
      },
      {},
    );

  const availableCategories = Object.keys(tokensByCategory).toSorted();

  const content = `${HEADER}export type TokenValue = string | number;

export const allTokenEntries: [string, TokenValue][] = ${JSON.stringify(allTokenEntries, null, 2)};

export const tokensByCategory: Record<string, Record<string, TokenValue>> = ${JSON.stringify(tokensByCategory, null, 2)};

export const availableCategories: string[] = ${JSON.stringify(availableCategories, null, 2)};
`;

  console.info(
    `[generateTokens] Found ${allTokenEntries.length} tokens across ${availableCategories.length} categories.`,
  );

  return writeGeneratedFile({
    scriptsDir,
    scriptName: "generateTokens.ts",
    outputFileName: "tokens.generated.ts",
    content,
  });
};

await generate();
