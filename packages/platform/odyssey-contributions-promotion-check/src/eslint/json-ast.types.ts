/**
 * These match the Momoa AST produced by @eslint/json.
 * We define them locally to avoid a fragile dependency on @humanwhocodes/momoa.
 */

export type JsonStringNode = {
  type: "String";
  value: string;
};

export type JsonObjectNode = {
  members: JsonMemberNode[];
  type: "Object";
};

export type JsonArrayNode = {
  elements: JsonElementNode[];
  type: "Array";
};

export type JsonElementNode = {
  type: "Element";
  value: JsonValueNode;
};

export type JsonMemberNode = {
  name: JsonStringNode;
  type: "Member";
  value: JsonValueNode;
};

export type JsonDocumentNode = {
  body: JsonValueNode;
  type: "Document";
};

export type JsonValueNode =
  | JsonArrayNode
  | JsonObjectNode
  | JsonStringNode
  | { type: string };
