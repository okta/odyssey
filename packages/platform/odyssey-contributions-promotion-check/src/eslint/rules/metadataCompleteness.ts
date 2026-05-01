import type { Rule } from "eslint";

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

import type { ContributionsMetadataFile } from "../../utils/metadata.js";
import type {
  JsonArrayNode,
  JsonDocumentNode,
  JsonStringNode,
  JsonValueNode,
} from "../json-ast.types.js";

import {
  calculateMetadataCompletenessValidation,
  type MetadataCompletenessViolation,
} from "../../validators/calculateMetadataCompletenessValidation.js";
import {
  asArrayNode,
  asObjectNode,
  asStringNode,
  findMember,
  parseJsonSource,
} from "../json-ast.utils.js";

/**
 * Build maps of componentName → value String node for stale/duplicate lookups.
 * duplicateNodeByName stores the second occurrence so the squiggle lands on the dupe.
 */
const extractComponentNameNodeMaps = (
  componentsArray: JsonArrayNode | null,
) => {
  const componentNodeByName = new Map<string, JsonStringNode>();
  const duplicateNodeByName = new Map<string, JsonStringNode>();
  if (!componentsArray) return { componentNodeByName, duplicateNodeByName };

  for (const element of componentsArray.elements) {
    const objectElement = asObjectNode(element.value);
    if (!objectElement) continue;
    const componentNameMember = findMember(objectElement, "componentName");
    if (!componentNameMember) continue;
    const nameNode = asStringNode(componentNameMember.value);
    if (!nameNode) continue;
    if (
      componentNodeByName.has(nameNode.value) &&
      !duplicateNodeByName.has(nameNode.value)
    ) {
      duplicateNodeByName.set(nameNode.value, nameNode);
    }
    componentNodeByName.set(nameNode.value, nameNode);
  }

  return { componentNodeByName, duplicateNodeByName };
};

const createViolationReporter =
  ({
    context,
    fallbackNode,
  }: {
    context: Rule.RuleContext;
    fallbackNode: JsonValueNode;
  }) =>
  ({
    node,
    messageId,
    violation,
  }: {
    messageId: "duplicateEntry" | "missingEntry" | "staleEntry";
    node?: JsonStringNode;
    violation: MetadataCompletenessViolation;
  }) => {
    context.report({
      node: node ?? fallbackNode,
      messageId,
      data: { componentName: violation.componentName },
    });
  };

export type MetadataCompletenessRuleDeps = {
  checkFileExists?: (filePath: string) => boolean;
  getExportedNames?: (indexFilePath: string) => Set<string>;
};

export const createMetadataCompletenessRule = ({
  checkFileExists = existsSync,
  getExportedNames,
}: MetadataCompletenessRuleDeps = {}): Rule.RuleModule => ({
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure contributionsMetadata.json lists every component exported from src/index.ts",
    },
    messages: {
      duplicateEntry:
        "'{{componentName}}' appears more than once in contributionsMetadata.json",
      missingEntry:
        "'{{componentName}}' is exported from src/index.ts but missing from contributionsMetadata.json",
      staleEntry:
        "'{{componentName}}' is in contributionsMetadata.json but not exported from src/index.ts",
    },
    schema: [],
  },

  create(context) {
    return {
      // @eslint/json uses "Document" as the root visitor node
      Document(documentNode: JsonDocumentNode) {
        const packageDir = dirname(context.filename);
        const indexFilePath = join(packageDir, "src", "index.ts");

        if (!checkFileExists(indexFilePath)) return;

        const metadata = parseJsonSource<ContributionsMetadataFile>(context);
        if (!metadata) return;

        const violations = calculateMetadataCompletenessValidation({
          ...(getExportedNames !== undefined && { getExportedNames }),
          metadata,
          packageDir,
        });

        if (violations.length === 0) return;

        // Navigate the JSON AST to find reportable nodes
        const rootObject = asObjectNode(documentNode.body);
        const componentsMember = rootObject
          ? findMember(rootObject, "components")
          : null;
        const componentsArray = componentsMember
          ? asArrayNode(componentsMember.value)
          : null;

        const { componentNodeByName, duplicateNodeByName } =
          extractComponentNameNodeMaps(componentsArray);

        const fallbackNode = componentsArray ?? rootObject ?? documentNode.body;
        const reportViolation = createViolationReporter({
          context,
          fallbackNode,
        });

        for (const violation of violations) {
          if (violation.kind === "duplicate_entry") {
            // points to the second occurrence of the componentName value string
            reportViolation({
              node: duplicateNodeByName.get(violation.componentName),
              messageId: "duplicateEntry",
              violation,
            });
          } else if (violation.kind === "in_metadata_but_not_exported") {
            // points to the componentName value string of the stale entry
            reportViolation({
              node: componentNodeByName.get(violation.componentName),
              messageId: "staleEntry",
              violation,
            });
          } else {
            // points to the "components" property key, the missing entry should be added there
            reportViolation({
              node: componentsMember?.name,
              messageId: "missingEntry",
              violation,
            });
          }
        }
      },
    } as Rule.RuleListener;
  },
});

export const metadataCompletenessRule = createMetadataCompletenessRule();
