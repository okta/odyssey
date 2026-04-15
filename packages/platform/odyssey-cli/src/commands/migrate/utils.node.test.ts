import { log } from "@clack/prompts";
import { describe, expect, it, vi } from "vitest";

import type { ComponentMapping } from "./mappings/index.js";

import { execAsync } from "../../utils.js";
import {
  createLogger,
  formatMigrationLabel,
  getEligibleMappings,
  updateOdyssey,
} from "./utils.js";

vi.mock("../../utils.js", async () => {
  return {
    ...(await vi.importActual("../../utils.js")),
    execAsync: vi.fn(),
  };
});

vi.mock("node:util", async () => ({
  ...(await vi.importActual("node:util")),
  styleText: (_: string[], text: string) => text,
}));

const mockedExecAsync = vi.mocked(execAsync);
vi.mock("./mappings/index.js", () => ({
  COMPONENT_MAPPINGS: MOCK_COMPONENT_MAPPINGS,
}));

const { MOCK_COMPONENT_MAPPINGS } = vi.hoisted(() => ({
  MOCK_COMPONENT_MAPPINGS: {
    NoMinVersion: {
      source: {
        component: "OldWidget",
        package: "@old/lib",
        propsType: "OldWidgetProps",
      },
      target: {
        component: "NewWidget",
        package: "@new/widgets",
        propsType: "NewWidgetProps",
      },
      propMap: { label: "title" },
    },
    WithMinVersion: {
      source: {
        component: "OldChart",
        package: "@old/lib",
        propsType: "OldChartProps",
      },
      target: {
        component: "NewChart",
        package: "@new/charts",
        minimumVersion: "2.0.0",
        propsType: "NewChartProps",
      },
      propMap: { data: "dataset" },
    },
    SubpathExport: {
      source: {
        component: "OldTable",
        package: "@okta/odyssey-react-mui",
        propsType: "OldTableProps",
      },
      target: {
        component: "NewTable",
        package: "@okta/odyssey-react-mui/labs",
        propsType: "NewTableProps",
      },
      propMap: { rows: "data" },
    },
    SubpathWithMinVersion: {
      source: {
        component: "OldGrid",
        package: "@okta/odyssey-react-mui",
        propsType: "OldGridProps",
      },
      target: {
        component: "NewGrid",
        package: "@okta/odyssey-react-mui/experimental",
        minimumVersion: "3.0.0",
        propsType: "NewGridProps",
      },
      propMap: { items: "cells" },
    },
  } satisfies Record<string, ComponentMapping>,
}));

describe("updateOdyssey", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs error and returns false if npm view returns empty version", async () => {
    const logger = vi.fn();
    mockedExecAsync.mockResolvedValueOnce({ stdout: "", stderr: "" });

    expect(await updateOdyssey(logger)).toBe(false);
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        message:
          "Failed to fetch latest version of @okta/odyssey-react-mui:\nNo version returned",
        type: "error",
      }),
    );
  });

  it("logs error and returns false if install command fails", async () => {
    const logger = vi.fn();
    mockedExecAsync.mockResolvedValueOnce({ stdout: "1.0.0", stderr: "" });
    mockedExecAsync.mockRejectedValueOnce(new Error("Install command failed"));

    expect(await updateOdyssey(logger)).toBe(false);
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Updating @okta/odyssey-react-mui to latest version 1.0.0...",
        type: "info",
      }),
    );
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        message:
          "Failed to update @okta/odyssey-react-mui:\nInstall command failed",
        type: "error",
      }),
    );
  });

  it("returns true if install command succeeds", async () => {
    const logger = vi.fn();
    mockedExecAsync.mockResolvedValueOnce({ stdout: "1.0.0", stderr: "" });

    expect(await updateOdyssey(logger)).toBe(true);
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Updating @okta/odyssey-react-mui to latest version 1.0.0...",
        type: "info",
      }),
    );
  });
});

describe("formatMigrationLabel", () => {
  it("formats migration label with colorized output for a given mapping key", () => {
    const key = Object.keys(MOCK_COMPONENT_MAPPINGS)[0];
    const label = formatMigrationLabel(key);
    expect(label).toEqual("OldWidget → NewWidget (@old/lib → @new/widgets)");
  });
});

describe("createLogger", () => {
  it("emits colorized messages for each log type", () => {
    const logger = createLogger(false);
    const logSpy = vi.spyOn(log, "info").mockImplementation(() => {});
    logger({ message: "info", type: "info" });
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("info"));
  });

  it("uses console methods in CI mode", () => {
    const logger = createLogger(true);
    const consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    logger({ message: "ci info", type: "info" });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("suppresses debug messages by default", () => {
    const logger = createLogger(false);
    const logSpy = vi.spyOn(log, "message");
    logger({ message: "debug message", type: "debug" });
    expect(logSpy).not.toHaveBeenCalled();
  });

  it("shows debug messages when verbose is enabled", () => {
    const logger = createLogger(false, true);
    const logSpy = vi.spyOn(log, "message").mockImplementation(() => {});
    logger({ message: "debug message", type: "debug" });
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("debug"),
      expect.objectContaining({ symbol: "○" }),
    );
  });
});

describe("getEligibleMappings", () => {
  it("should return all mappings as eligible when every target package is installed", () => {
    const deps = {
      "@new/widgets": "^1.0.0",
      "@new/charts": "^3.0.0",
      "@okta/odyssey-react-mui": "^3.0.0",
    };

    const result = getEligibleMappings(deps);

    expect(result.eligible).toEqual([
      { key: "NoMinVersion" },
      { key: "WithMinVersion" },
      { key: "SubpathExport" },
      { key: "SubpathWithMinVersion" },
    ]);
    expect(result.hidden).toEqual([]);
  });

  it("should hide all mappings when no target packages are installed", () => {
    const result = getEligibleMappings({});

    expect(result.eligible).toEqual([]);
    expect(result.hidden).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: "NoMinVersion" }),
        expect.objectContaining({ key: "WithMinVersion" }),
        expect.objectContaining({ key: "SubpathExport" }),
        expect.objectContaining({ key: "SubpathWithMinVersion" }),
      ]),
    );
  });

  it("should evaluate only the requested keys when a filter is provided", () => {
    const deps = { "@new/widgets": "^1.0.0" };

    const result = getEligibleMappings(deps, ["NoMinVersion"]);

    expect(result.eligible).toEqual([{ key: "NoMinVersion" }]);
    expect(result.hidden).toEqual([]);
  });

  it("should hide mapping with reason when target package is not installed", () => {
    const result = getEligibleMappings({}, ["NoMinVersion"]);

    expect(result.hidden).toEqual([
      { key: "NoMinVersion", reason: "@new/widgets not installed" },
    ]);
  });

  it("should include minimum version in hidden reason when target is not installed and minimumVersion is set", () => {
    const result = getEligibleMappings({}, ["WithMinVersion"]);

    expect(result.hidden).toEqual([
      {
        key: "WithMinVersion",
        reason: "@new/charts not installed (requires >= 2.0.0)",
      },
    ]);
  });

  it("should mark as eligible when installed version meets the minimum", () => {
    const result = getEligibleMappings({ "@new/charts": "^2.0.0" }, [
      "WithMinVersion",
    ]);

    expect(result.eligible).toEqual([{ key: "WithMinVersion" }]);
    expect(result.hidden).toEqual([]);
  });

  it("should hide mapping when installed version is below the minimum", () => {
    const result = getEligibleMappings({ "@new/charts": "^1.9.0" }, [
      "WithMinVersion",
    ]);

    expect(result.eligible).toEqual([]);
    expect(result.hidden).toEqual([
      {
        key: "WithMinVersion",
        reason: "@new/charts ^1.9.0 < required 2.0.0",
      },
    ]);
  });

  it("should mark as eligible when no minimumVersion is specified regardless of installed version", () => {
    const result = getEligibleMappings({ "@new/widgets": "^0.0.1" }, [
      "NoMinVersion",
    ]);

    expect(result.eligible).toEqual([{ key: "NoMinVersion" }]);
  });

  it("should treat unparseable versions as ineligible", () => {
    const result = getEligibleMappings({ "@new/charts": "not-a-version" }, [
      "WithMinVersion",
    ]);

    expect(result.hidden).toHaveLength(1);
    expect(result.hidden[0].key).toBe("WithMinVersion");
  });

  describe("subpath exports", () => {
    it("should resolve subpath export to base package when looking up installed deps", () => {
      const result = getEligibleMappings(
        { "@okta/odyssey-react-mui": "^1.0.0" },
        ["SubpathExport"],
      );

      expect(result.eligible).toEqual([{ key: "SubpathExport" }]);
      expect(result.hidden).toEqual([]);
    });

    it("should hide subpath mapping when base package version is below minimum", () => {
      const result = getEligibleMappings(
        { "@okta/odyssey-react-mui": "^2.0.0" },
        ["SubpathWithMinVersion"],
      );

      expect(result.eligible).toEqual([]);
      expect(result.hidden).toEqual([
        {
          key: "SubpathWithMinVersion",
          reason:
            "@okta/odyssey-react-mui/experimental ^2.0.0 < required 3.0.0",
        },
      ]);
    });

    it("should hide subpath mapping when base package is not installed", () => {
      const result = getEligibleMappings({}, ["SubpathExport"]);

      expect(result.hidden).toEqual([
        {
          key: "SubpathExport",
          reason: "@okta/odyssey-react-mui/labs not installed",
        },
      ]);
    });
  });

  describe("workspace protocol versions", () => {
    it("should treat workspace:* as eligible when no minimumVersion is set", () => {
      const result = getEligibleMappings({ "@new/widgets": "workspace:*" }, [
        "NoMinVersion",
      ]);

      expect(result.eligible).toEqual([{ key: "NoMinVersion" }]);
      expect(result.hidden).toEqual([]);
    });

    it("should treat workspace:* as eligible even when minimumVersion is set", () => {
      const result = getEligibleMappings({ "@new/charts": "workspace:*" }, [
        "WithMinVersion",
      ]);

      expect(result.eligible).toEqual([{ key: "WithMinVersion" }]);
      expect(result.hidden).toEqual([]);
    });

    it("should resolve workspace protocol with subpath exports", () => {
      const result = getEligibleMappings(
        { "@okta/odyssey-react-mui": "workspace:*" },
        ["SubpathExport"],
      );

      expect(result.eligible).toEqual([{ key: "SubpathExport" }]);
      expect(result.hidden).toEqual([]);
    });
  });
});
