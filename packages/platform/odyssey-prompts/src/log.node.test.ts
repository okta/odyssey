import { log as clackLog } from "@clack/prompts";
import { styleText } from "node:util";
import { describe, expect, test, vi } from "vitest";

import { getSymbol, log } from "./log.js";

vi.mock("@clack/prompts", () => ({
  log: {
    error: vi.fn(),
    info: vi.fn(),
    message: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
  },
}));

describe(getSymbol.name, () => {
  test("outline-circle returns the circle character", () => {
    expect(getSymbol({ symbol: "outline-circle" })).toBe("○");
  });

  test("diamond returns the diamond character", () => {
    expect(getSymbol({ symbol: "diamond" })).toBe("◆");
  });

  test("pipe-branch returns the branch character", () => {
    expect(getSymbol({ symbol: "pipe-branch" })).toBe("├──");
  });

  test("pipe-end returns the end character", () => {
    expect(getSymbol({ symbol: "pipe-end" })).toBe("└──");
  });

  test("unknown string returned as-is", () => {
    expect(getSymbol({ symbol: "custom-symbol" })).toBe("custom-symbol");
  });

  test("SymbolConfig object with color override", () => {
    expect(
      getSymbol({ symbol: { icon: "outline-circle", style: "cyan" } }),
    ).toBe("○");
  });

  test("color has no effect on raw symbols", () => {
    expect(
      getSymbol({ symbol: { icon: "custom-symbol", style: "cyan" } }),
    ).toBe("custom-symbol");
  });
});

describe("log", () => {
  describe("info", () => {
    test("routes to clackLog.info", () => {
      log.info({ message: "hello" });
      expect(vi.mocked(clackLog.info)).toHaveBeenCalledWith("hello");
    });
  });

  describe("debug", () => {
    test("routes to clackLog.message with default outline-circle symbol", () => {
      log.debug({ message: "debug info" });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith(
        styleText(["dim", "bold"], "debug info"),
        { symbol: getSymbol({ symbol: "outline-circle" }) },
      );
    });

    test("named symbol overrides the default", () => {
      log.debug({ message: "debug", options: { symbol: "pipe-branch" } });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith(
        styleText(["dim", "bold"], "debug"),
        { symbol: getSymbol({ symbol: "pipe-branch" }) },
      );
    });

    test("free-text symbol used as-is", () => {
      log.debug({ message: "debug", options: { symbol: ">>>" } });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith(
        styleText(["dim", "bold"], "debug"),
        { symbol: ">>>" },
      );
    });

    test("SymbolConfig object with color override", () => {
      log.debug({
        message: "debug",
        options: { symbol: { icon: "outline-circle", style: "cyan" } },
      });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith(
        styleText(["dim", "bold"], "debug"),
        {
          symbol: getSymbol({
            symbol: { icon: "outline-circle", style: "cyan" },
          }),
        },
      );
    });
  });

  describe("message", () => {
    test("routes to clackLog.message with no symbol when none provided", () => {
      log.message({ message: "neutral" });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith("neutral", {
        symbol: undefined,
      });
    });

    test("named symbol is resolved before passing to clack", () => {
      log.message({ message: "header", options: { symbol: "pipe-branch" } });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith("header", {
        symbol: getSymbol({ symbol: "pipe-branch" }),
      });
    });

    test("free-text symbol passed through unchanged", () => {
      log.message({ message: "header", options: { symbol: ">>>" } });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith("header", {
        symbol: ">>>",
      });
    });

    test("color overrides named symbol default", () => {
      log.message({
        message: "header",
        options: { symbol: { icon: "outline-circle", style: "cyan" } },
      });
      expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith("header", {
        symbol: getSymbol({
          symbol: { icon: "outline-circle", style: "cyan" },
        }),
      });
    });
  });
});
