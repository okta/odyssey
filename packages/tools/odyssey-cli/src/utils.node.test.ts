import { type FSWatcher, type MatchFunction, watch } from "chokidar";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { type Logger, runWatchTask } from "./utils";

vi.mock("chokidar", async () => {
  return {
    ...(await vi.importActual("chokidar")),
    watch: vi.fn(),
  };
});

const mockWatch = vi.mocked(watch);
const mockWatcherOn = vi.fn<FSWatcher["on"]>();
const mockLogger: Logger = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  processStart: vi.fn(),
  success: vi.fn(),
};
const onChange = vi.fn().mockResolvedValue(undefined);
const mockWatcher: Partial<FSWatcher> = {
  on: mockWatcherOn,
  close: vi.fn(),
};

type OnListener = Parameters<FSWatcher["on"]>[1];

describe("utils", () => {
  describe("runWatchTask", () => {
    // trigger the internal 'change' event
    const triggerChange = (file = "test.properties") => {
      const callback: (a: string) => void = mockWatcherOn.mock.calls.find(
        (call) => call[0] === "change",
      )?.[1] as OnListener;
      if (callback) callback(file);
    };

    beforeEach(() => {
      vi.resetAllMocks();

      vi.mocked(mockWatch).mockReturnValue(mockWatcher as FSWatcher);
    });

    test("initializes the watcher with correct options", () => {
      const ignored = vi.fn<MatchFunction>();
      runWatchTask({
        path: "src/properties",
        onChange,
        logger: mockLogger,
        chokidarOptions: { depth: 0, ignored },
      });

      expect(mockWatch).toHaveBeenCalledWith("src/properties", {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
          pollInterval: 100,
          stabilityThreshold: 500,
        },
        depth: 0,
        ignored,
      });
    });

    test("runs the task when a file changes", () => {
      runWatchTask({ path: "src", onChange, logger: mockLogger });

      // Trigger a file change
      triggerChange("test.properties");

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining("File changed"),
      );

      expect(onChange).toHaveBeenCalled();
    });

    test("handles errors gracefully without crashing", async () => {
      runWatchTask({ path: "src", onChange, logger: mockLogger });

      // Make the task fail
      const error = new Error("Build Failed");
      onChange.mockRejectedValueOnce(error);

      // Trigger change
      triggerChange();

      expect(onChange).toHaveBeenCalledTimes(1);
      await vi.waitFor(() => {
        expect(mockLogger.error).toHaveBeenCalledWith(
          "Error during watch execution: Build Failed",
        );
      });

      // Ensure we can still run again after an error
      onChange.mockReset();
      onChange.mockResolvedValueOnce(undefined);

      triggerChange();

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test("queues a re-run if a change occurs while building (Debounce/Queue Logic)", async () => {
      // Create a "Controlled Promise" so we can pause execution
      let resolveBuild: (value?: unknown) => void = () => {};
      const delayedTask = vi.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          resolveBuild = resolve;
        });
      });

      runWatchTask({ path: "src", onChange: delayedTask, logger: mockLogger });

      // Trigger first event
      triggerChange("A.properties");
      expect(delayedTask).toHaveBeenCalledTimes(1);

      // Trigger second event, *WHILE* first event is still running (promise not resolved)
      triggerChange("B.properties");

      // task should NOT have run a second time yet
      expect(delayedTask).toHaveBeenCalledTimes(1);

      // finish the first event
      resolveBuild();

      // task should have run a second time automatically
      await vi.waitFor(() => {
        expect(delayedTask).toHaveBeenCalledTimes(2);
      });
    });
  });
});
