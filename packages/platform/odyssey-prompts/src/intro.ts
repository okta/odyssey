import { intro as clackIntro } from "@clack/prompts";
import { styleText } from "node:util";

export const intro = (title: string): void => {
  clackIntro(styleText(["black", "bgCyan"], ` ${title} `));
};
