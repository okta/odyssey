import { outro as clackOutro } from "@clack/prompts";
import { styleText } from "node:util";

export const outro = (message: string): void => {
  clackOutro(styleText("dim", message));
};
