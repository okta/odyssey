import { dirname, resolve } from "node:path";
import { type CommandModule } from "yargs";

import { execAsync } from "../../utils";

export type GeneratePLPropertiesArgs = {
  "--"?: string[];
};

const generatePLProperties = async (argv: GeneratePLPropertiesArgs) => {
  const pseudoLocPkg = require.resolve(
    "@okta/tools.i18n.pseudo-loc/package.json",
  );
  const binPath = resolve(dirname(pseudoLocPkg), "bin/pseudo-loc.js");

  const passthroughArgs = (argv["--"] || []).join(" ");
  await execAsync(
    `node ${JSON.stringify(binPath)} generate --resourcePath src/properties ${passthroughArgs}`.trim(),
  );
};

export const generatePseudoLocaleProperties: CommandModule<
  object,
  GeneratePLPropertiesArgs
> = {
  builder: (yargs) => yargs.parserConfiguration({ "populate--": true }),
  command: "generate:pseudoLocaleProperties",
  describe:
    "Small wrapper around the `@okta/tools.i18n.pseudo-loc` that generates the pseudo locale properties files.",
  handler: generatePLProperties,
};
