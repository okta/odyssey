import { styleText } from "node:util";

import type { LogMessage, LogOptions, LogType } from "./log.js";

import { formatMessage } from "./format.js";
import { log } from "./log.js";

export type LogEntry = {
  message: LogMessage;
  options?: LogOptions;
  type: LogType;
};

export type Logger = (entry: LogEntry) => void;

export type CreateLoggerOptions = {
  isCI: boolean;
  prefix?: string;
  verbose?: boolean;
};

export type CreateScopedLoggerOptions = {
  baseLogger: Logger;
  isCI?: boolean;
  label: string;
  verbose?: boolean;
};

const ciConsoleMethods: Record<
  LogType,
  "log" | "info" | "warn" | "error" | "debug"
> = {
  info: "info",
  warn: "warn",
  error: "error",
  success: "log",
  debug: "debug",
} as const;

export const createLogger =
  ({ isCI, verbose = false, prefix }: CreateLoggerOptions): Logger =>
  ({ message, type, options }: LogEntry) => {
    if (type === "debug" && !verbose) return;

    if (isCI) {
      const formatted = formatMessage({
        message,
        indentation: options?.indentation,
      });
      console[ciConsoleMethods[type]](
        prefix ? `[${prefix}] ${formatted}` : formatted,
      );
    } else {
      log[type]({ message, options });
    }
  };

export const createScopedLogger = ({
  label,
  baseLogger,
  isCI = false,
  verbose = false,
}: CreateScopedLoggerOptions): Logger => {
  let headerEmitted = false;

  return (entry: LogEntry) => {
    const isActionable = entry.type !== "debug";

    if (!headerEmitted && (verbose || isActionable)) {
      if (isCI) {
        baseLogger({ message: label, type: "info" });
      } else {
        log.message({
          message: styleText(["black", "bgWhite"], label),
          options: { symbol: "diamond" },
        });
      }
      headerEmitted = true;
    }

    baseLogger({
      ...entry,
      options: headerEmitted
        ? { ...entry.options, indentation: 2 }
        : entry.options,
    });
  };
};
