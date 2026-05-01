import { log as clackLog } from "@clack/prompts";
import { styleText } from "node:util";
import { describe, expect, test, vi } from "vitest";

import { createLogger, createScopedLogger } from "./createLogger.js";

vi.mock("@clack/prompts", () => ({
  log: {
    error: vi.fn(),
    info: vi.fn(),
    message: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
  },
}));

describe(createLogger.name, () => {
  describe("CI mode", () => {
    test("routes to the matching console method", () => {
      const consoleSpy = vi.spyOn(console, "info");
      const logger = createLogger({ isCI: true });
      logger({ type: "info", message: "hello" });
      expect(consoleSpy).toHaveBeenCalledWith("hello");
    });

    test("success routes to console.log since console.success does not exist", () => {
      const consoleSpy = vi.spyOn(console, "log");
      const logger = createLogger({ isCI: true });
      logger({ type: "success", message: "done" });
      expect(consoleSpy).toHaveBeenCalledWith("done");
    });

    test("debug is silent when verbose is false", () => {
      const consoleSpy = vi.spyOn(console, "debug");
      const logger = createLogger({ isCI: true, verbose: false });
      logger({ type: "debug", message: "detail" });
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    test("debug routes to console.debug when verbose is true", () => {
      const consoleSpy = vi.spyOn(console, "debug");
      const logger = createLogger({ isCI: true, verbose: true });
      logger({ type: "debug", message: "detail" });
      expect(consoleSpy).toHaveBeenCalledWith("detail");
    });

    test("prepends prefix to message when prefix is set", () => {
      const consoleSpy = vi.spyOn(console, "info");
      const logger = createLogger({ isCI: true, prefix: "myprefix" });
      logger({ type: "info", message: "hello" });
      expect(consoleSpy).toHaveBeenCalledWith("[myprefix] hello");
    });
  });

  describe("non-CI mode", () => {
    test("delegates to the log module", () => {
      const logger = createLogger({ isCI: false });
      logger({ type: "info", message: "hello" });
      expect(vi.mocked(clackLog.info)).toHaveBeenCalledWith("hello");
    });
  });
});

describe(createScopedLogger.name, () => {
  test("header emitted before first actionable message", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({ label: "my-scope", baseLogger });
    scopedLogger({ type: "info", message: "first" });
    expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith(
      styleText(["black", "bgWhite"], "my-scope"),
      { symbol: "◆" },
    );
  });

  test("header emitted only once across multiple messages", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({ label: "scope", baseLogger });
    scopedLogger({ type: "info", message: "first" });
    scopedLogger({ type: "warn", message: "second" });
    expect(vi.mocked(clackLog.message)).toHaveBeenCalledTimes(1);
  });

  test("baseLogger called with indentation 2 after header", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({ label: "scope", baseLogger });
    scopedLogger({ type: "info", message: "hello" });
    expect(baseLogger).toHaveBeenCalledWith({
      message: "hello",
      options: { indentation: 2 },
      type: "info",
    });
  });

  test("no header when only debug messages and verbose is false", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({
      label: "scope",
      baseLogger,
      verbose: false,
    });
    scopedLogger({ type: "debug", message: "detail" });
    expect(vi.mocked(clackLog.message)).not.toHaveBeenCalled();
  });

  test("header emitted for debug message when verbose is true", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({
      label: "scope",
      baseLogger,
      verbose: true,
    });
    scopedLogger({ type: "debug", message: "detail" });
    expect(vi.mocked(clackLog.message)).toHaveBeenCalledWith(
      styleText(["black", "bgWhite"], "scope"),
      { symbol: "◆" },
    );
  });

  test("baseLogger always called regardless of header emission", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({
      label: "scope",
      baseLogger,
      verbose: false,
    });
    scopedLogger({ type: "debug", message: "detail" });
    expect(baseLogger).toHaveBeenCalledOnce();
  });

  test("header emitted via baseLogger instead of clackLog.message when in CI mode", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({
      label: "my-scope",
      baseLogger,
      isCI: true,
    });
    scopedLogger({ type: "info", message: "first" });
    expect(baseLogger).toHaveBeenCalledWith({
      message: "my-scope",
      type: "info",
    });
    expect(vi.mocked(clackLog.message)).not.toHaveBeenCalled();
  });

  test("baseLogger receives original options when no header was emitted", () => {
    const baseLogger = vi.fn();
    const scopedLogger = createScopedLogger({
      label: "scope",
      baseLogger,
      verbose: false,
    });
    scopedLogger({
      type: "debug",
      message: "detail",
      options: { indentation: 2 },
    });
    expect(baseLogger).toHaveBeenCalledWith({
      message: "detail",
      options: { indentation: 2 },
      type: "debug",
    });
  });
});
