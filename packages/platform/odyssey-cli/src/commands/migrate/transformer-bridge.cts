/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any */
import type { API, FileInfo, Options } from "jscodeshift";

/**
 * BRIDGE FILE: jscodeshift workers use require(), which cannot load ESM.
 * We use this CommonJS bridge to dynamically import our ESM transformer.
 */
module.exports = async function (file: FileInfo, api: API, options: Options) {
  // We use dynamic import to load the ESM version of the transformer.
  const { default: transformer } = (await import("./transformer.js")) as any;

  return transformer(file, api, options);
};
