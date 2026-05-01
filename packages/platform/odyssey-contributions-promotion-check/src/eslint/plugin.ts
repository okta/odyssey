import { metadataCompletenessRule } from "./rules/metadataCompleteness.js";

export const contributionsPlugin = {
  meta: {
    name: "@okta/odyssey-contributions",
  },
  rules: {
    "metadata-completeness": metadataCompletenessRule,
  },
};
