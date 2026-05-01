import type { Rule } from "eslint";

import type {
  JsonArrayNode,
  JsonMemberNode,
  JsonObjectNode,
  JsonStringNode,
  JsonValueNode,
} from "./json-ast.types.js";

export const parseJsonSource = <T>(context: Rule.RuleContext): T | null => {
  try {
    return JSON.parse(context.sourceCode.getText()) as T;
  } catch {
    return null;
  }
};

export const asObjectNode = (node: JsonValueNode): JsonObjectNode | null =>
  node.type === "Object" ? (node as JsonObjectNode) : null;

export const asArrayNode = (node: JsonValueNode): JsonArrayNode | null =>
  node.type === "Array" ? (node as JsonArrayNode) : null;

export const findMember = (
  objectNode: JsonObjectNode,
  key: string,
): JsonMemberNode | undefined =>
  objectNode.members.find((member) => member.name.value === key);

export const asStringNode = (node: JsonValueNode): JsonStringNode | null =>
  node.type === "String" ? (node as JsonStringNode) : null;
