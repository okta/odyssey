import { log as clackLog } from "@clack/prompts";
import { styleText } from "node:util";

import { formatMessage } from "./format.js";

export type LogType = "info" | "warn" | "error" | "success" | "debug";

export type LogMessage = string | { details: string[]; title: string };

export type NamedSymbol =
  | "diamond"
  | "outline-circle"
  | "pipe-branch"
  | "pipe-end";

export type LogSymbol = NamedSymbol | (string & {});

type StyleTextFormat = Parameters<typeof styleText>[0];

export type TextStyle = Extract<StyleTextFormat, string>;

export type SymbolConfig = {
  icon: LogSymbol;
  style?: TextStyle;
};

export type LogOptions = {
  indentation?: number;
  symbol?: SymbolConfig | LogSymbol;
};

export type LogMethodArgs = {
  message: LogMessage;
  options?: LogOptions;
};

export type GetSymbolArgs = {
  symbol: SymbolConfig | LogSymbol;
};

const logColorFunction: Record<LogType, (text: string) => string> = {
  info: (text) => styleText("cyan", text),
  warn: (text) => styleText("yellow", text),
  error: (text) => styleText("red", text),
  success: (text) => text,
  debug: (text) => styleText(["dim", "bold"], text),
} as const;

const namedSymbolCharacters: Record<NamedSymbol, string> = {
  diamond: "◆",
  "outline-circle": "○",
  "pipe-branch": "├──",
  "pipe-end": "└──",
} as const;

const namedSymbolDefaultStyles: Record<NamedSymbol, TextStyle> = {
  diamond: "whiteBright",
  "outline-circle": "dim",
  "pipe-branch": "gray",
  "pipe-end": "gray",
} as const;

const isNamedSymbol = (icon: LogSymbol): icon is NamedSymbol =>
  Object.hasOwn(namedSymbolCharacters, icon);

export const getSymbol = ({ symbol }: GetSymbolArgs): string => {
  const { icon, style } =
    typeof symbol === "string" ? { icon: symbol, style: undefined } : symbol;

  if (!isNamedSymbol(icon)) return icon;

  const character = namedSymbolCharacters[icon];
  const resolvedStyle = style ?? namedSymbolDefaultStyles[icon];
  return styleText(resolvedStyle, character);
};

type EmitLogArgs = LogMethodArgs & { type: LogType };

const emitLog = ({ type, message, options }: EmitLogArgs): void => {
  const colorFunction = logColorFunction[type];
  const formatted = formatMessage({
    message,
    colorFunction,
    indentation: options?.indentation,
  });
  if (type === "debug") {
    clackLog.message(formatted, {
      symbol: getSymbol({
        symbol: options?.symbol ?? "outline-circle",
      }),
    });
  } else {
    clackLog[type](formatted);
  }
};

const logMethod =
  (type: LogType) =>
  ({ message, options }: LogMethodArgs): void =>
    emitLog({ type, message, options });

export const log = {
  info: logMethod("info"),
  warn: logMethod("warn"),
  error: logMethod("error"),
  success: logMethod("success"),
  debug: logMethod("debug"),
  message: ({ message, options }: LogMethodArgs): void => {
    const symbol =
      options?.symbol !== undefined
        ? getSymbol({ symbol: options.symbol })
        : undefined;
    clackLog.message(
      formatMessage({ message, indentation: options?.indentation }),
      {
        symbol,
      },
    );
  },
} as const;
