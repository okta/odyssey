import { styleText } from "node:util";

import type { LogMessage } from "./log.js";

export type FormatMessageArgs = {
  colorFunction?: (text: string) => string;
  indentation?: number;
  message: LogMessage;
};

export const formatMessage = ({
  colorFunction = (text) => text,
  indentation = 0,
  message,
}: FormatMessageArgs): string => {
  const prefix = " ".repeat(indentation);
  if (typeof message === "string") {
    return colorFunction(`${prefix}${message}`);
  }
  const title = colorFunction(`${prefix}${styleText("bold", message.title)}`);
  const details = message.details
    .map((detail) => colorFunction(`${prefix}  - ${detail}`))
    .join("\n");
  return `${title}\n${details}`;
};
